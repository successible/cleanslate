import { css } from '@emotion/react'
import axios from 'axios'
import { compareVersions } from 'compare-versions'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { debounce } from 'lodash-es'
import UAParser from 'ua-parser-js'
import BarcodeWithoutScanner from '../../assets/common/barcode-without-scanner.svg'
import { Unit } from '../../constants/units'
import { capitalize } from '../../helpers/capitalize'
import { getDispatch } from '../../helpers/getDispatch'
import { isMobile } from '../../helpers/isMobile'
import { isMobileSafari } from '../../helpers/isMobileSafari'
import { isNumeric } from '../../helpers/isNumeric'
import { isProduction } from '../../helpers/isProduction'
import { round } from '../../helpers/round'
import { Food } from '../../models/food'
import { Barcode, defaultMeal } from '../../models/log'
import { Profile } from '../../models/profile'
import { Explanation } from '../explanation/Explanation'
import { Image } from '../image/Image'
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
        const { nutriments, product_name } = product
        const {
          proteins_100g,
          proteins_serving,
          serving_quantity,
          serving_size,
        } = nutriments

        setBarcode({
          calories_per_gram: nutriments['energy-kcal_100g'] / 100,
          calories_per_serving: nutriments['energy-kcal_serving'],
          code: code,
          name: product_name,
          protein_per_gram: proteins_100g / 100,
          protein_per_serving: proteins_serving,
          serving_quantity,
          serving_size,
        })
      })
  }, 100)

  useEffect(() => {
    // On localhost on development on a desktop, we want to "mock" the barcode scanning operation
    // That way, you do not need to proxy to your phone every time you want test the feature
    if (!isProduction() && !isMobile()) {
      fetchData('3017620422003') // Nutella
    }
  }, [])

  const parser = UAParser(window.navigator.userAgent)
  const browser = parser.browser
  // Bug: Designed to handle "Invalid argument not valid semver ('X.X,X' received)"
  const version = String(browser.version).replace(',', '.').replace(',', '.')

  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy

  const oldSafari =
    isMobileSafari() &&
    // 'wasm-unsafe-eval' is only supported on Safari 16 and above
    compareVersions('16.0.0', version) == 1

  // 'wasm-unsafe-eval' is only supported on Chrome 103 and above
  const oldChrome =
    browser.name == 'Chrome' && compareVersions('103', version) == 1

  // 'wasm-unsafe-eval' is only supported on Firefox 102 and above
  const oldFirefox =
    browser.name == 'Firefox' && compareVersions('102', version) == 1

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
    if (
      isNumeric(barcode?.calories_per_gram) &&
      isNumeric(barcode?.protein_per_gram)
    ) {
      selectedItem.caloriesPerGram = barcode.calories_per_gram
      selectedItem.proteinPerGram = barcode.protein_per_gram
      if (
        isNumeric(barcode?.calories_per_serving) &&
        isNumeric(barcode?.protein_per_serving)
      ) {
        selectedItem.countToGram = round(
          barcode.calories_per_serving / barcode.calories_per_gram,
          0
        )
        selectedItem.caloriesPerCount = round(
          barcode.calories_per_gram * selectedItem.countToGram,
          0
        )
        selectedItem.proteinPerCount = round(
          barcode.protein_per_gram * selectedItem.countToGram,
          0
        )
      }
    }
  }

  return (
    <>
      {!barcode ? (
        <Scan
          scanRate={250}
          onScan={(code: string) => !ran && fetchData(code)}
        />
      ) : (
        <div>
          <div className={`w100 fr m20`}>
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
