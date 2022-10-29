import { css } from '@emotion/react'
import axios from 'axios'
import { compareVersions } from 'compare-versions'
import { useRef, useState } from 'react'
import { useStoreon } from 'storeon/react'
import { debounce } from 'throttle-debounce'
import UAParser from 'ua-parser-js'
import BarcodeWithoutScanner from '../../assets/common/barcode-without-scanner.svg'
import { isMobileSafari } from '../../helpers/ui/isMobileSafari'
import { capitalize } from '../../helpers/utility/capitalize'
import { Barcode } from '../../models/Log/model'
import { Unit } from '../../models/Log/types'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { spawnAlert } from '../alert/helpers/spawnAlert'
import { Explanation } from '../explanation/Explanation'
import { FractionInput } from '../fraction-input/FractionInput'
import { Image } from '../image/Image'
import Scan from '../scanner/components/scan'
import { Select } from '../select/Select'
import { ButtonPanel } from '../standard-editor/components/ButtonPanel'
import { submitEditor } from '../standard-editor/helpers/submitEditor'

export const CameraModal = () => {
  const [barcode, setBarcode] = useState(null as Barcode | null)
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('COUNT' as Unit)
  const [ran, setRan] = useState(false)

  const amountInput = useRef<HTMLInputElement>(null)

  const {
    dispatch,
  }: {
    dispatch: Dispatch<AllEvents>
  } = useStoreon()

  const fetchData = debounce(100, (code: string) => {
    console.log('Fetching data from world.openfoodfacts...')
    setRan(true)
    axios
      .get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then((r) => {
        if (r.data.status_verbose !== 'product found') {
          dispatch('closeCameraModal')
          spawnAlert('Matching food not found!', 'danger')
          return
        }
        const product = r.data.product
        console.log(product)
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

  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy

  const oldSafari =
    isMobileSafari() &&
    // 'wasm-unsafe-eval' is only supported on Safari 16.1 and above
    compareVersions('16.1', String(browser.version)) == 1

  // 'wasm-unsafe-eval' is only supported on Chrome 103 and above
  const oldChrome =
    browser.name == 'Chrome' &&
    compareVersions('103', String(browser.version)) == 1

  // 'wasm-unsafe-eval' is only supported on Firefox 102 and above
  const oldFirefox =
    browser.name == 'Firefox' &&
    compareVersions('102', String(browser.version)) == 1

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
          the your browser. Please update to the latest version.
        </div>
      </Explanation>
    )
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
              {capitalize(barcode.name)}
            </span>
          </div>
          <FractionInput
            inputRef={amountInput}
            className="m20"
            value={amount}
            setValue={(value) => setAmount(value)}
            placeholder={'Enter amount...'}
          />
          <Select
            focus={false}
            currentOption={unit}
            optionDictionary={[
              { COUNT: 'SERVING', GRAM: 'GRAM' } as Record<Unit, string>,
            ]}
            onChange={(newUnit: Unit) => {
              setUnit(newUnit)
            }}
          />
          <ButtonPanel
            showSubmit={Boolean(amount && unit)}
            submit={() => {
              submitEditor('log', null, Number(amount), unit, barcode, dispatch)
            }}
          />
        </div>
      )}
    </>
  )
}
