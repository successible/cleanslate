import { css } from '@emotion/react'
import axios from 'axios'
import { compareVersions } from 'compare-versions'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { debounce } from 'throttle-debounce'
import UAParser from 'ua-parser-js'
import BarcodeWithoutScanner from '../../assets/common/barcode-without-scanner.svg'
import { Unit } from '../../constants/units'
import { capitalize } from '../../helpers/capitalize'
import { getDispatch } from '../../helpers/getDispatch'
import { isMobileSafari } from '../../helpers/isMobileSafari'
import { Barcode, defaultMeal } from '../../models/log'
import { Profile } from '../../models/profile'
import { Explanation } from '../explanation/Explanation'
import { Image } from '../image/Image'
import Scan from '../scanner/components/scan'
import { ButtonPanel } from '../standard-adder/components/ButtonPanel'
import { InputFields } from '../standard-adder/components/InputFields'
import { submitEditor } from '../standard-adder/helpers/submitEditor'

type props = { profile: Profile }
export const CameraModal: React.FC<props> = ({ profile }) => {
  const { enablePlanning } = profile
  const dispatch = getDispatch()

  const [barcode, setBarcode] = useState(null as Barcode | null)
  const [amount, setAmount] = useState('')
  const [meal, setMeal] = useState(defaultMeal)

  const [unit, setUnit] = useState('GRAM' as Unit)
  const [ran, setRan] = useState(false)

  const fetchData = debounce(100, (code: string) => {
    setRan(true)
    axios
      .get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then((r) => {
        if (r.data.status_verbose !== 'product found') {
          dispatch('closeCameraModal')
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
  })

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

  // If serving is not present in the database, do not show it as an option!
  const options = [{ GRAM: 'GRAM' } as Record<Unit, string>]
  if (barcode?.calories_per_serving || barcode?.protein_per_serving) {
    options[0].COUNT = 'SERVING'
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
            selectedItem={null}
            unit={unit}
            setUnit={setUnit}
            amount={amount}
            setAmount={setAmount}
            enablePlanning={enablePlanning}
            meal={meal}
            setMeal={setMeal}
          />
          <ButtonPanel
            showSubmit={Boolean(amount && unit)}
            submit={() => {
              submitEditor(
                'log',
                null,
                Number(amount),
                unit,
                barcode,
                enablePlanning,
                meal,
                dispatch
              )
            }}
          />
        </div>
      )}
    </>
  )
}
