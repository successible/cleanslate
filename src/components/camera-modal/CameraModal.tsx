import { useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
import { createWorker } from 'tesseract.js'

export const CameraModal = () => {
  const webcamRef = useRef(null)
  const capture = useCallback(async () => {
    // @ts-ignore
    const imageSrc = webcamRef?.current?.getScreenshot()
    const imageBuffer = Buffer.from(
      imageSrc.replace('data:image/jpeg;base64,', ''),
      'base64'
    )

    const worker = createWorker({
      logger: (m) => console.log(m),
    })

    ;(async () => {
      await worker.load()
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      const {
        data: { text },
      } = await worker.recognize(imageBuffer)
      console.log(text)
      await worker.terminate()
    })()
  }, [webcamRef])
  return (
    <>
      <Webcam
        audio={false}
        width="100%"
        height="100%"
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: 'user',
        }}
      />
      <button className="purple" type="button" onClick={capture}>
        Capture photo
      </button>
    </>
  )
}
