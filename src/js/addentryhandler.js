class AddEntryHandler {
  constructor (selector) {
    this.selector = selector;
    this.addListeners();
  }

  addListeners () {
    let forms = document.getElementsByClassName(this.selector);

    for (let i = 0; i < forms.length; i++) {
      let form = forms[i];

      forms[i].querySelector('.addButtons').onclick = this.handleClick.bind(this, form)
      forms[i].querySelector('.closeButton').onclick = this.handleClick.bind(this, form)
    }
  }

  handleClick (form) {
    form.querySelector('.addButtons').classList.toggle('hidden')
    form.querySelector('form').classList.toggle('hidden')
  }
}

module.exports = AddEntryHandler
