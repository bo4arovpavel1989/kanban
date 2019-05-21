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
      form.querySelector('form').onsubmit = this.handleSubmit.bind(this, form)
    }
  }

  handleClick (form) {
    form.querySelector('.addButtons').classList.toggle('hidden')
    form.querySelector('form').classList.toggle('hidden')
    form.querySelector('form').reset()
  }

  handleSubmit (form, e) {
    e.preventDefault()

    let name = form.querySelector('textarea').value;

    this.addNewEntry(form, name)
    form.querySelector('form').reset()
  }

  addNewEntry (form, name) {
    let entry = document.createElement('div');

    entry.innerHTML = name
    entry.className = 'entry'
    form.previousElementSibling.appendChild(entry)
  }
}

module.exports = AddEntryHandler
