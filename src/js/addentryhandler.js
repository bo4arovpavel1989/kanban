const DragManager = require('./dragmanager')

/* Class dscribing behavior of addEntry forms */
class AddEntryHandler {
  constructor (selector) {
    this.selector = selector;
    this.addListeners();
    this.dragManager = new DragManager()
  }

  /**
    * Method add listeners to all control elements of addEntry forms in document
    *@return {void}
    */
  addListeners () {
    let forms = document.getElementsByClassName(this.selector);

    for (let i = 0; i < forms.length; i++) {
      let form = forms[i];

      forms[i].querySelector('.addButtons').onclick = this.handleClick.bind(this, form)
      forms[i].querySelector('.closeButton').onclick = this.handleClick.bind(this, form)
      form.querySelector('form').onsubmit = this.handleSubmit.bind(this, form)
    }
  }

  /**
    * Method handles click on addEntry form open/close buttons
    * @param {Object} form - current form to handle
    * @return {Void}
    */
  handleClick (form) {
    form.querySelector('.addButtons').classList.toggle('hidden')
    form.querySelector('form').classList.toggle('hidden')
    form.querySelector('form').reset()
  }

  /**
    * Method handles addEntry from submit
    * @param {Object} form - to be handled
    * @return {void}
    */
  handleSubmit (form, e) {
    e.preventDefault()

    let name = form.querySelector('textarea').value;

    this.addNewEntry(form, name)
    form.querySelector('form').reset()
  }

  /**
    * Method creates new entry HTML element
    * @returns {void}
    */
  addNewEntry (form, name) {
    let entry = document.createElement('div');

    entry.innerHTML = name
    entry.className = 'entry'
    entry.setAttribute('draggable', true)
    entry.ondragstart = this.dragManager.dragStart
    form.previousElementSibling.querySelector('.entries').appendChild(entry)
  }
}

module.exports = AddEntryHandler
