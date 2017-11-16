class ConsoleInput extends HTMLElement {
  constructor() {
    super()
    this.addEventListener('keypress', e => {
      const key = e.which || e.keyCode
      console.log('pressed ' + key)
      if(key === 13)
        alert('enter clicked')
    })
  }

  connectedCallback() {
    this.innerHTML = `<input type="text" style="width: 100%;font-size:18px;margin:0px 20px"></input>`
  }
}
customElements.define('console-input', ConsoleInput)
