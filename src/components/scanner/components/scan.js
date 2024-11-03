import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { Explanation } from '../../explanation/Explanation'
import { WORKER_TYPE } from '../helpers'
import { CODE_TYPE } from '../transformers/base'

const BTN_TXT = {
  AGAIN: 'START AGAIN',
  START: 'START',
  STOP: 'STOP',
}

const CANVAS_SIZE = {
  HEIGHT: 430,
  WIDTH: 320,
}

const sw = CANVAS_SIZE.WIDTH
const sh = CANVAS_SIZE.HEIGHT
const dw = sw
const dh = sh
const dx = 0
const dy = 0
let sx = 0
let sy = 0

let fps = 0

const crossHairSvg =
  'M77.125 148.02567c0-3.5774 2.73862-6.27567 6.37076-6.27567H119V117H84.0192C66.50812 117 52 130.77595 52 148.02567V183h25.125v-34.97433zM237.37338 117H202v24.75h35.18494c3.63161 0 6.69006 2.69775 6.69006 6.27567V183H269v-34.97433C269 130.77595 254.88446 117 237.37338 117zM243.875 285.4587c0 3.5774-2.73863 6.27567-6.37076 6.27567H202V317h35.50424C255.01532 317 269 302.70842 269 285.4587V251h-25.125v34.4587zM83.49576 291.73438c-3.63213 0-6.37076-2.69776-6.37076-6.27568V251H52v34.4587C52 302.70842 66.50812 317 84.0192 317H119v-25.26563H83.49576z'
const crossHairWidth = 217,
  crossHairHeight = 200,
  x0 = 53,
  y0 = 117

class Scan extends React.Component {
  constructor(props) {
    super(props)
    this.video = document.createElement('video')
    this.video.onplaying = () => {
      sx = (this.video.videoWidth - CANVAS_SIZE.WIDTH) / 2
      sy = (this.video.videoHeight - CANVAS_SIZE.HEIGHT) / 2
    }
    this.state = {
      btnText: BTN_TXT.START,
      bw: this.props.bw,
      codeType: CODE_TYPE.RAW,
      crosshair: this.props.crosshair,
      fpsOn: this.props.fps,
      neverScanned: true,
      onScan: this.props.onScan,
      openModal: false,
      rawCode: '',
      scanning: false,
      flash: false,
      transformToggle: true,
      worker: this.props.worker,
    }

    this.decodeQR = this.props.decode
    this.scanRate = this.props.scanRate
    this.qrworker = null
    this.oldTime = 0
  }

  initWorker = () => {
    this.qrworker = new Worker(this.state.worker + 'Worker.js')

    this.qrworker.onmessage = async (ev) => {
      if (ev.data != null) {
        this.qrworker.terminate()
        const result = ev.data
        this.stopScan()

        let res = result.data
        const milliseconds = ev.data.ms
        const rawCode = res
        let codeType = CODE_TYPE.RAW

        this.setState({
          barcode: res,
          codeType,
          milliseconds,
          rawCode,
          resultOpen: true,
        })
      }
    }
  }

  startScan = () => {
    this.initWorker()
    this.fpsTimestamp = new Date()

    this.setState({
      barcode: '',
      btnText: BTN_TXT.STOP,
      codeType: CODE_TYPE.RAW,
      neverScanned: false,
      rawCode: '',
      resultOpen: false,
      scanning: true,
      flash: false,
      transformToggle: true,
    })
    navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'environment' } })
        .then((stream) => {
        this.video.srcObject = stream
        this.video.setAttribute('playsinline', 'true')
        this.video.play()
        requestAnimationFrame(this.tick)
      })
      .catch((err) => {
        this.stopScan()
        alert(err)
      })
  }

  initializeAudio = () => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    if (window.AudioContext) {
      window.audioContext = new window.AudioContext()
    }
    const fixAudioContext = function () {
      if (window.audioContext) {
        // Create empty buffer
        const buffer = window.audioContext.createBuffer(1, 1, 22050)
        const source = window.audioContext.createBufferSource()
        source.buffer = buffer
        // Connect to output (speakers)
        source.connect(window.audioContext.destination)
        // Play sound
        if (source.start) {
          source.start(0)
        } else if (source.play) {
          source.play(0)
        } else if (source.noteOn) {
          source.noteOn(0)
        }
      }
      // Remove events
      document.removeEventListener('touchstart', fixAudioContext)
      document.removeEventListener('touchend', fixAudioContext)
    }
    // iOS 6-8
    document.addEventListener('touchstart', fixAudioContext)
    // iOS 9
    document.addEventListener('touchend', fixAudioContext)
  }

  stopScan = () => {
    this.setState({
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19)',
      btnText: BTN_TXT.START,
      scanning: false,
    })
    this.video.pause()
    if (this.video.srcObject) {
      this.video.srcObject.getVideoTracks().forEach((track) => track.stop())
      this.video.srcObject = null
    }
  }

  tick = (time) => {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      if (this.state.fpsOn) {
        fps = 1000 / (time - this.fpsTimestamp)
        this.fpsTimestamp = time
      }

      this.canvas.drawImage(this.video, sx, sy, sw, sh, dx, dy, dw, dh)

      if (this.state.bw) this.monochromize()
      if (this.state.crosshair) this.drawCrosshair()
      if (this.state.fpsOn) this.drawFPS(fps)
      if (this.state.scanning) requestAnimationFrame(this.tick)
      if (this.decodeQR) this.recognizeQRcode(time)
    } else if (this.state.scanning) requestAnimationFrame(this.tick)
  }

  monochromize = () => {
    let imgd = this.canvas.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    )
    let pix = imgd.data
    for (let i = 0; i < pix.length; i += 4) {
      let gray = pix[i] * 0.3 + pix[i + 1] * 0.59 + pix[i + 2] * 0.11
      pix[i] = gray
      pix[i + 1] = gray
      pix[i + 2] = gray
    }
    this.canvas.putImageData(imgd, 0, 0)
  }

  drawCrosshair = () => {
    this.canvas.fillStyle = 'rgba(255,255,255,0.4)'
    const shape = new Path2D(crossHairSvg)
    this.canvas.fill(shape)
  }

  recognizeQRcode = (time) => {
    if (time - this.oldTime > this.scanRate) {
      this.oldTime = time
      let imageData
      if (this.state.crosshair === true)
        imageData = this.canvas.getImageData(
          x0,
          y0,
          crossHairWidth,
          crossHairHeight
        )
      else
        imageData = this.canvas.getImageData(
          0,
          0,
          this.canvasElement.width,
          this.canvasElement.height
        )
      this.qrworker.postMessage({
        height: imageData.height,
        width: imageData.width,
      })
      this.qrworker.postMessage(imageData, [imageData.data.buffer])
    }
  }

  drawFPS = (fps) => {
    this.canvas.font = 'normal 16pt Arial'
    this.canvas.fillStyle = '#f8ff4c'
    this.canvas.fillText(Math.round(fps) + ' fps', 10, CANVAS_SIZE.HEIGHT - 16)
  }

  componentDidMount() {
    this.canvasElement = document.getElementById('canvas')
    this.canvas = this.canvasElement.getContext('2d')
    this.canvasElement.width = CANVAS_SIZE.WIDTH
    this.canvasElement.height = CANVAS_SIZE.HEIGHT
  }

  onBtnClickHandler = (e) => {
    e.preventDefault()
    if (this.state.scanning) this.stopScan()
    else this.startScan()
  }
  onFlashClickHandler = (e) => {
    e.preventDefault()
    if (this.state.flash) {
      this.setState({flash: false})
      navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'environment' } })
          .then((stream) => {
            this.video.srcObject = stream
            stream.getVideoTracks()[0].applyConstraints({advanced: [{torch: false}]}).catch(err =>
                console.log(err))
          })
    }
    else {
      this.setState({flash: true})
      navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'environment' } })
          .then((stream) => {
            this.video.srcObject = stream
            stream.getVideoTracks()[0].applyConstraints({advanced: [{torch: true}]}).catch(err =>
            console.log(err))
          })
    }
  }

  startStyle = () => {
    const style = { textAlign: 'center', width: 64 }
    if (this.state.scanning) return { backgroundColor: 'red', ...style }
    else return { backgroundColor: '', ...style }
  }
  flashStyle = () => {
    const style = { textAlign: 'center', width: 64 }
    if (this.state.scanning) return { display: 'unset', ...style }
    else return { display: 'none', ...style }
    if (this.state.flash) return { backgroundColor: 'yellow', ...style }
    else return { backgroundColor: '', ...style }
  }

  render() {
    if (this.state.resultOpen) {
      const result = this.renderQrCodeResult()
      this.props.onScan(result)
    }
    return (
        <div
            className="fcs"
            css={css`
              width: 90%;
              height: 100%;
              max-width: 400px;
            `}
        >
          {this.state.neverScanned && (
              <Explanation color="blue">
                <div>
                  This barcode scanner uses the Open Food Facts database. Because
                  this database is a free service, it may not have every food. Just
                  a heads up!
                </div>
              </Explanation>
          )}
          <canvas
              css={css`
                width: 100%;
                max-width: 400px;
                max-height: ${this.state.neverScanned ? '0px' : '400px'};
                margin: 0px auto;
              `}
              id="canvas"
          />
          <button
              className="purple bold"
              css={css`
                width: 100% !important;
                margin: 20px auto !important;
                margin-bottom: ${!this.state.neverScanned
                    ? '20px !important'
                    : '0px !important'};
              `}
              onTouchStart={this.initializeAudio}
              onClick={this.onBtnClickHandler}
              style={this.startStyle()}
          >
            {this.state.scanning ? 'Stop scan' : 'Scan barcode'}
          </button>
          <button
              className="yellow bold"
              css={css`
            width: 100% !important;
            margin-bottom: ${!this.state.neverScanned
                  ? '20px !important'
                  : '0px !important'};
          `}
              onClick={this.onFlashClickHandler}
              style={this.flashStyle()}
          >
            {this.state.flash ? 'Turn off flash' : 'Turn on flash'}
          </button>
        </div>
    )
  }

  renderQrCodeResult = () => {
    return this.state.barcode
  }

  componentWillUnmount() {
    if (this.state.scanning === true) this.stopScan()
  }
}

Scan.propTypes = {
  bw: PropTypes.bool,
  crosshair: PropTypes.bool,
  decode: PropTypes.bool,
  fps: PropTypes.bool,
  scanRate: PropTypes.number,
  worker: PropTypes.string,
}

Scan.defaultProps = {
  bw: false,
  crosshair: true,
  decode: true,
  fps: false,
  scanRate: 250,
  worker: WORKER_TYPE.WASM,
}

export default Scan
