// Constants
const swAvailable = 'serviceWorker' in navigator
const url = window.location.origin
const swUrl = url + '/sw.js'

const throttle = (func, timeFrame) => {
  let lastTime = 0
  return function () {
    const now = new Date()
    if (now - lastTime >= timeFrame) {
      func()
      lastTime = now
    }
  }
}

const register = () => {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // This function runs on every page load, even if the service worker is already registered

      const update = throttle(() => {
        console.log('Checking for an update to the service worker...')
        registration.update()
      }, 5000)
      window.addEventListener('click', update)

      // Let's listen to the installation cascade.
      // BUT, only in a very specific scenario, when the service worker has changed.
      // Otherwise, I don't care.
      registration.onupdatefound = () => {
        const worker = registration.installing
        if (worker) {
          worker.addEventListener('statechange', () => {
            const state = worker.state
            console.log('Service worker is in the ' + state + ' state ...')
            if (state === 'activated') {
              window.alert('Update complete! 🚀 Reloading app.')
              window.location.reload()
            }
          })
        }
      }
    })
    .catch((error) => {
      console.log(error)
      const errorMessage =
        'An error has occurred. If it persists, please email support.'
      alert(errorMessage)
    })
}

const load = () => {
  if (swAvailable && !origin.includes('localhost')) {
    window.addEventListener('load', register)
  }
}

load()
