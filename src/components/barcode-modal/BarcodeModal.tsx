import { css } from '@emotion/react'
import axios from 'axios'
import { compareVersions } from 'compare-versions'
import { debounce } from 'lodash-es'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { UAParser } from 'ua-parser-js'
import BarcodeWithoutScanner from '../../assets/common/barcode-without-scanner.svg'
import type { Unit } from '../../constants/units'
import { capitalize } from '../../helpers/capitalize'
import { getDispatch } from '../../helpers/getDispatch'
import { isMobileSafari } from '../../helpers/isMobileSafari'
import { isNumeric } from '../../helpers/isNumeric'
import { round } from '../../helpers/round'
import { Food } from '../../models/food'
import { type Barcode, defaultMeal } from '../../models/log'
import type { Profile } from '../../models/profile'
import { Explanation } from '../explanation/Explanation'
import { Image } from '../image/Image'
import { mapOtherVolumeUnitToTbsp } from '../macros/helpers/mapOtherVolumeUnitToTbsp'
import Scan from '../scanner/components/scan'
import { ButtonPanel } from '../standard-adder/components/ButtonPanel'
import { InputFields } from '../standard-adder/components/InputFields'
import { submitEditor } from '../standard-adder/helpers/submitEditor'

type props = { profile: Profile; type: 'ingredient' | 'log' }
export const BarcodeModal: React.FC<props> = ({ profile, type }) => {
  const { enablePlanning } = profile
  const dispatch = getDispatch()

  const [barcode, setBarcode] = useState(null as Barcode | null)
  const [amount, setAmount] = useState('')
  const [meal, setMeal] = useState(defaultMeal)
  const [createCustomFood, setCreateCustomFood] = useState(false)

  const [unit, setUnit] = useState('GRAM' as Unit)
  const [ran, setRan] = useState(false)

  // 3017620422003 (Nutella) is a good test value for grams
  // 0096619445387 (Olive Oil) is a good test value for liquids
  const fetchData = debounce((code: string) => {
    setRan(true)
    axios
      .get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then((r) => {
        if (r.data.status_verbose !== 'product found') {
          dispatch('closeBarcodeModal')
          toast.error('Matching food not found!')
          return
        }
        const product = r.data.product
        const { nutriments, product_name, nutrition_data_per } = product
        const { proteins_100g, proteins_serving } = nutriments
        console.log(nutrition_data_per)

        setBarcode({
          calories_per_gram: nutriments['energy-kcal_100g'] / 100, // or mL, OpenFoodFacts names it 100 gram as a legacy behaviour
          calories_per_serving: nutriments['energy-kcal_serving'],
          code: code,
          name: product_name,
          nutrition_data_per,
          protein_per_gram: proteins_100g / 100, // or mL, OpenFoodFacts names it 100 gram as a legacy behaviour
          protein_per_serving: proteins_serving,
        })
      })
  }, 100)

  const parser = UAParser(window.navigator.userAgent)
  const browser = parser.browser
  // Bug: Designed to handle "Invalid argument not valid semver ('X.X,X' received)"
  const version = String(browser.version).replace(',', '.').replace(',', '.')

  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy

  const oldSafari =
    isMobileSafari() &&
    // 'wasm-unsafe-eval' is only supported on Safari 16 and above
    compareVersions('16.0.0', version) === 1

  // 'wasm-unsafe-eval' is only supported on Chrome 103 and above
  const oldChrome =
    browser.name === 'Chrome' && compareVersions('103', version) === 1

  // 'wasm-unsafe-eval' is only supported on Firefox 102 and above
  const oldFirefox =
    browser.name === 'Firefox' && compareVersions('102', version) === 1

  if (oldSafari || oldChrome || oldFirefox) {
    return (
      <Explanation
        color="blue"
        css={css`
          margin: 0px auto;
          margin-top: 20px;
          width: 90%;
        `}
      >
        <div>
          For security reasons, this feature is not supported on your version of
          your browser. Please update to the latest version.
        </div>
      </Explanation>
    )
  }

  const selectedItem = new Food()
  if (barcode) {
    selectedItem.name = barcode.name
    selectedItem.caloriesPerCount = barcode.calories_per_serving
    selectedItem.proteinPerCount = barcode.protein_per_serving
    if (barcode?.calories_per_gram && isNumeric(barcode?.calories_per_gram)) {
      if (barcode?.nutrition_data_per === '100ml') {
        // Weight: Easy. 120 calories per serving / 40 calories per gram = 3 grams per serving
        // Volume: Harder. 120 calories per serving / 8 calories per mL = 15 mL per serving
        // 15 mL per serving is 1 TBSP per serving
        selectedItem.countToGram = mapOtherVolumeUnitToTbsp(
          'mL',
          round(barcode.calories_per_serving / barcode.calories_per_gram, 0)
        )
      } else {
        selectedItem.countToGram = round(
          barcode.calories_per_serving / barcode.calories_per_gram,
          0
        )
      }
    }
  }

  console.log(selectedItem)

  return (
    <>
      {!barcode ? (
        <Scan
          scanRate={250}
          onScan={(code: string) => !ran && fetchData(code)}
        />
      ) : (
        <div>
          <div className={'w100 fr m20'}>
            <Image
              width={50}
              height={50}
              src={BarcodeWithoutScanner}
              alt="Barcode"
            />
            <span
              css={css`
                margin-left: 15px;
                font-size: 1rem;
                font-weight: 400;
              `}
            >
              {capitalize(barcode.name || 'Unknown')}
            </span>
          </div>
          <InputFields
            selectedItem={selectedItem}
            unit={unit}
            setUnit={setUnit}
            amount={amount}
            setAmount={setAmount}
            enablePlanning={enablePlanning}
            meal={meal}
            setMeal={setMeal}
          />
          {/* Custom foods require a count. Hence, if the per serving is missing, you cannot add a custom food */}
          {/* We only want to create a custom food from a barcode. Doing so from a recipe adds to much complexity */}
          {/* As the recipe form must re-render with the custom food */}
          {isNumeric(barcode?.calories_per_serving) &&
            isNumeric(barcode?.protein_per_serving) &&
            type === 'log' && (
              <div className="fr">
                <label htmlFor="customFood">
                  Create a custom food from this scan?
                </label>
                <input
                  checked={createCustomFood}
                  onChange={(e) => {
                    setCreateCustomFood(e.target.checked)
                  }}
                  id="customFood"
                  type="checkbox"
                />
              </div>
            )}

          <ButtonPanel
            showSubmit={Boolean(amount && unit)}
            submit={() => {
              submitEditor(
                type,
                null,
                Number(amount),
                unit,
                barcode,
                enablePlanning,
                meal,
                dispatch,
                type === 'ingredient' ? selectedItem : undefined,
                createCustomFood ? selectedItem : undefined
              )
            }}
          />
        </div>
      )}
    </>
  )
}
