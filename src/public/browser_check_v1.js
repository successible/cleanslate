// Detect IE
if (window.document.documentMode) {
  setTimeout(() => {
    document.body.innerHTML =
      '<div style="text-align: center; margin: 100px auto; font-size: 40px; max-width: 800px; width: 90%; line-height: 2">You are using an unsupported browser. <br /> To use Clean Slate, use a browser listed <a href="https://bestvpn.org/outdatedbrowser/en">here<a></div>.'
  }, 1000)
}
