class MyConsole extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        input, textarea { font-size:18px; width: 95% }
      </style>

      <textarea readonly rows="14"></textarea>
      <input type="text"></input>
    `

    this.querySelector('input').addEventListener('keypress', this.onKeyPress)
  }

  onKeyPress(e) {
    const key = e.which || e.keyCode
    if(key !== 13)
      return

    console.log('enter pressed')
  }

}
customElements.define('my-console', MyConsole)
