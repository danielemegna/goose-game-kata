class MyConsole extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        input, textarea { font-size:18px; width: 95% }
      </style>

      <textarea readonly rows="14">> Hello!</textarea>
      <input type="text"></input>
    `

    const inputElement = this.querySelector('input')
    const outputArea = this.querySelector('textarea')

    inputElement.addEventListener('keypress', this.onInputKeyPress(outputArea))
  }

  onInputKeyPress(outputArea) {
    return (e) => {
      if(!this.isEnterPressure(e)) return

      const command = this.extractAndClearInput(e)
      this.writeOutput(command, outputArea)
    }
  }

  isEnterPressure(e) {
    const key = e.which || e.keyCode
    return key === 13
  }

  extractAndClearInput(e) {
    const input = e.srcElement.value
    e.srcElement.value = ''
    return input
  }

  writeOutput(command, outputArea) {
    outputArea.textContent += "\n> " + command
    outputArea.scrollTop = outputArea.scrollHeight;
  }

}
customElements.define('my-console', MyConsole)
