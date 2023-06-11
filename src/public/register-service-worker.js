const swAvailable = 'serviceWorker' in navigator
const url = window.location.origin
const swUrl = url + '/service-worker.js'

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
  if (!swAvailable || origin.includes('http://localhost')) return

  console.log('Registering the service worker at ' + swUrl)

  navigator.serviceWorker
    .register(swUrl)
    // This function runs on every page load, even if the service worker is already registered
    .then((registration) => {
      console.log(registration)
      const update = throttle(() => {
        console.log('Checking for an update to the service worker...')
        window.fetch('/version.txt').then((response) => {
          response.text().then((value) => {
            const newVersion = value.trim()
            const oldVersion = String(localStorage.getItem('version')).trim()
            console.log(oldVersion, newVersion)
            if (oldVersion !== newVersion) {
              localStorage.setItem('version', newVersion)
              navigator.serviceWorker
                .getRegistrations()
                .then((registrations) =>
                  Promise.all(registrations.map((r) => r.unregister()))
                )
                .then(() => {
                  window.alert('Update complete! 🚀 Reloading app.')
                  window.location.reload()
                })
            }
          })
        })
      }, 5000)
      window.addEventListener('click', update)
      update()
    })
    .catch((error) => {
      console.log(error)
      alert('An error has occurred. Email support if the error persists!')
    })
}

register()
