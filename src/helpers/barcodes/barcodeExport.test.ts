import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'

jest.mock('./barcode', () => ({ renderBarcode: jest.fn() }))

// Use require so that these modules load after jest.mock runs.
const { renderBarcode } = require('./barcode')
const { downloadBarcode, printBarcode } =
  require('./barcodeExport') as typeof import('./barcodeExport')

const CODE = 'CS00000042'
const PNG = 'data:image/png;base64,TEST'

const createFakes = () => {
  const context = {
    // In these tests, each character is 10 pixels wide.
    measureText: jest.fn((text: string) => ({ width: text.length * 10 })),
    fillRect: jest.fn(),
    fillText: jest.fn(),
    drawImage: jest.fn(),
  }
  const bars = { width: 528, height: 220 }
  const label = {
    width: 0,
    height: 0,
    getContext: jest.fn((): typeof context | null => context),
    toDataURL: jest.fn(() => PNG),
  }
  const link = { href: '', download: '', click: jest.fn(), remove: jest.fn() }

  // The code creates the barcode canvas first, then the label canvas.
  const canvases = [bars, label]
  const document = {
    createElement: jest.fn((tag: string) =>
      tag === 'a' ? link : canvases.shift()
    ),
    body: { append: jest.fn() },
  }

  const image = {
    alt: '',
    src: '',
    style: { width: '' },
    onload: null as null | (() => void),
  }
  const printWindow = {
    focus: jest.fn(),
    print: jest.fn(),
    document: {
      title: '',
      createElement: jest.fn(() => image),
      body: { append: jest.fn() },
    },
  }
  const window = {
    open: jest.fn((): typeof printWindow | null => printWindow),
  }

  return { context, bars, label, link, document, image, printWindow, window }
}

let fakes: ReturnType<typeof createFakes>

beforeEach(() => {
  jest.clearAllMocks()
  fakes = createFakes()
  Object.assign(globalThis, { document: fakes.document, window: fakes.window })
})

afterEach(() => {
  Reflect.deleteProperty(globalThis, 'document')
  Reflect.deleteProperty(globalThis, 'window')
})

describe('downloadBarcode', () => {
  test('downloads the PNG and removes the link', () => {
    downloadBarcode(CODE, 'Pudding')

    expect(fakes.link.href).toBe(PNG)
    expect(fakes.link.download).toBe('Pudding-CS00000042.png')
    expect(fakes.document.body.append).toHaveBeenCalledWith(fakes.link)
    expect(fakes.link.click).toHaveBeenCalledTimes(1)
    expect(fakes.link.remove).toHaveBeenCalledTimes(1)
    expect(fakes.label.toDataURL).toHaveBeenCalledWith('image/png')
  })

  test('draws the name above a larger barcode', () => {
    downloadBarcode(CODE, 'Pudding')

    expect(renderBarcode).toHaveBeenCalledWith(fakes.bars, CODE, {
      width: 4,
      height: 160,
      margin: 40,
    })
    expect(fakes.label.width).toBe(528)
    expect(fakes.label.height).toBe(280)
    expect(fakes.context.fillText).toHaveBeenCalledWith('Pudding', 264, 20, 488)
    expect(fakes.context.drawImage).toHaveBeenCalledWith(fakes.bars, 0, 60)
  })

  test('puts a long name on more than one line', () => {
    const [a, b, c, d] = ['a', 'b', 'c', 'd'].map((letter) => letter.repeat(20))

    downloadBarcode(CODE, `${a} ${b} ${c} ${d}`)

    expect(fakes.context.fillText.mock.calls).toEqual([
      [`${a} ${b}`, 264, 20, 488],
      [`${c} ${d}`, 264, 60, 488],
    ])
    expect(fakes.label.height).toBe(320)
    expect(fakes.context.drawImage).toHaveBeenCalledWith(fakes.bars, 0, 100)
  })

  test('adds no text space for an empty name', () => {
    downloadBarcode(CODE, '   ')

    expect(fakes.context.fillText).not.toHaveBeenCalled()
    expect(fakes.label.height).toBe(220)
    expect(fakes.link.download).toBe('CS00000042.png')
  })

  test.each([
    ["Mom's Mac & Cheese", 'Mom-s-Mac-Cheese-CS00000042.png'],
    ['Crème brûlée', 'Crème-brûlée-CS00000042.png'],
    ['../secret', 'secret-CS00000042.png'],
    ['!!!', 'CS00000042.png'],
    ['a'.repeat(60), `${'a'.repeat(50)}-CS00000042.png`],
  ])('makes a safe filename for "%s"', (name, expected) => {
    downloadBarcode(CODE, name)

    expect(fakes.link.download).toBe(expected)
  })

  test('fails if the canvas has no drawing context', () => {
    fakes.label.getContext.mockReturnValue(null)

    expect(() => downloadBarcode(CODE, 'Pudding')).toThrow(
      'Could not create the barcode image'
    )
    expect(fakes.link.click).not.toHaveBeenCalled()
  })
})

describe('printBarcode', () => {
  test('prints only after the image loads', () => {
    printBarcode(CODE, 'Pudding')

    expect(fakes.window.open).toHaveBeenCalledWith('', '_blank')
    expect(fakes.printWindow.document.title).toBe('Barcode CS00000042')
    expect(fakes.printWindow.document.body.append).toHaveBeenCalledWith(
      fakes.image
    )
    expect(fakes.image.src).toBe(PNG)
    expect(fakes.image.alt).toBe('Pudding barcode CS00000042')
    expect(fakes.image.style.width).toBe('50mm')
    expect(fakes.printWindow.print).not.toHaveBeenCalled()

    fakes.image.onload?.()

    expect(fakes.printWindow.focus).toHaveBeenCalledTimes(1)
    expect(fakes.printWindow.print).toHaveBeenCalledTimes(1)
  })

  test('fails if the print window is blocked', () => {
    fakes.window.open.mockReturnValue(null)

    expect(() => printBarcode(CODE, 'Pudding')).toThrow(
      'The print window was blocked'
    )
  })
})
