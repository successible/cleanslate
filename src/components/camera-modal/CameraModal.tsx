import { css } from '@emotion/react'
import axios from 'axios'
import { useRef, useState } from 'react'
import { useStoreon } from 'storeon/react'
import { debounce } from 'throttle-debounce'
import BarcodeWithoutScanner from '../../assets/common/barcode-without-scanner.svg'
import { capitalize } from '../../helpers/utility/capitalize'
import { Barcode } from '../../models/Log/model'
import { Unit } from '../../models/Log/types'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { FractionInput } from '../fraction-input/FractionInput'
import { Image } from '../image/Image'
import Scan from '../scanner/components/scan'
import { Select } from '../select/Select'
import { ButtonPanel } from '../standard-editor/components/ButtonPanel'
import { submitEditor } from '../standard-editor/helpers/submitEditor'
export const CameraModal = () => {
  const [barcode, setBarcode] = useState(null as Barcode | null)
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('GRAM' as Unit)
  const amountInput = useRef<HTMLInputElement>(null)

  const {
    dispatch,
  }: {
    dispatch: Dispatch<AllEvents>
  } = useStoreon()

  return (
    <>
      {!barcode ? (
        <Scan
          scanRate={250}
          onScan={debounce(100, (code: string) => {
            axios
              .get(
                `https://world.openfoodfacts.org/api/v0/product/${code}.json`
              )
              .then((r) => {
                const product = r.data.product
                const { product_name } = product
                const {
                  energy_100g,
                  energy_serving,
                  proteins_100g,
                  proteins_serving,
                } = product.nutriments

                console.log({
                  calories_per_gram: energy_100g / 100,
                  calories_per_serving: energy_serving,
                  code: code,
                  name: product_name,
                  protein_per_gram: proteins_100g / 100,
                  protein_per_serving: proteins_serving,
                })
                setBarcode({
                  calories_per_gram: energy_100g / 100,
                  calories_per_serving: energy_serving,
                  code: code,
                  name: product_name,
                  protein_per_gram: proteins_100g / 100,
                  protein_per_serving: proteins_serving,
                })
              })
          })}
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
            // @ts-ignore - We only want to use two units here: COUNT and GRAM
            optionDictionary={[
              { COUNT: 'COUNT', GRAM: 'GRAM' } as Record<Unit, string>,
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
