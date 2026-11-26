import { renderBarcode } from './barcode'

const FONT = 'bold 32px sans-serif'
const LINE_HEIGHT = 40
const PADDING = 20

/**
 * Creates a PNG of a barcode.
 *
 * @param barcode
 * @param foodName
 * @returns
 */
const createBarcodePng = (barcode: string, foodName: string): string => {
  const bars = document.createElement('canvas')
  // Use more pixels than on screen to make a sharper print.
  renderBarcode(bars, barcode, { width: 4, height: 160, margin: 40 })

  const label = document.createElement('canvas')
  const context = label.getContext('2d')
  if (!context) throw new Error('Could not create the barcode image')

  const textWidth = bars.width - PADDING * 2
  context.font = FONT
  const lines = wrapText(context, foodName, textWidth)
  const textHeight = lines.length ? lines.length * LINE_HEIGHT + PADDING : 0

  // A change to the canvas size resets its drawing settings.
  label.width = bars.width
  label.height = textHeight + bars.height

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, label.width, label.height)

  context.fillStyle = '#000000'
  context.font = FONT
  context.textAlign = 'center'
  context.textBaseline = 'top'
  lines.forEach((line, index) => {
    const y = PADDING + index * LINE_HEIGHT
    // The last value compresses a very long word to make it fit.
    context.fillText(line, label.width / 2, y, textWidth)
  })

  context.drawImage(bars, 0, textHeight)
  return label.toDataURL('image/png')
}

/**
 * Create filename for the food's barcode.
 *
 * @param barcode
 * @param foodName
 * @returns
 */
const createFileName = (barcode: string, foodName: string): string => {
  const safeName = foodName
    .replace(/[^\p{L}\p{N}]+/gu, '-') // Keep letters and numbers.
    .slice(0, 50)
    .replace(/^-+|-+$/g, '')

  return safeName ? `${safeName}-${barcode}.png` : `${barcode}.png`
}

/**
 * Download PNG of a barcode.
 *
 * @param barcode
 * @param foodName
 */
export const downloadBarcode = (barcode: string, foodName: string): void => {
  const link = document.createElement('a')
  link.href = createBarcodePng(barcode, foodName)
  link.download = createFileName(barcode, foodName)
  document.body.append(link)
  link.click()
  link.remove()
}

/**
 * Prints barcode for printer.
 *
 * @param barcode
 * @param foodName
 */
export const printBarcode = (barcode: string, foodName: string): void => {
  const url = createBarcodePng(barcode, foodName)
  const printWindow = window.open('', '_blank')
  if (!printWindow) throw new Error('The print window was blocked')

  const { document: page } = printWindow
  page.title = `Barcode ${barcode}`

  const image = page.createElement('img')
  image.alt = `${foodName} barcode ${barcode}`
  image.style.width = '50mm'
  image.onload = () => {
    printWindow.focus()
    printWindow.print()
  }
  image.src = url

  page.body.append(image)
}

/**
 * Splits text into lines that fit the specified width, where possible.
 *
 * Useful for downloading the barcode so we can add the name of the food.
 *
 * @param context
 * @param text
 * @param maxWidth
 * @returns
 */
const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] => {
  const lines: string[] = []
  let line = ''

  for (const word of text.trim().split(/\s+/)) {
    const next = line ? `${line} ${word}` : word
    if (line && context.measureText(next).width > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }

  if (line) lines.push(line)
  return lines
}
