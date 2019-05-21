class AddColumnHandler {
  constructor (selector, entryHandler) {
    this.selector = selector
    this.entryHandler = entryHandler
    this.addListeners()
  }

  addListeners () {
    let form = document.getElementById(this.selector);

    form.onclick = this.handleClick.bind(this)
  }

  handleClick () {
    let formToClone = document.getElementById('columnForm');
    let insertBefore = document.getElementById('addColumnButton');
    let newForm = formToClone.cloneNode(true);

    newForm.classList.remove('hidden')
    newForm.removeAttribute('id')
    document.getElementById('container').insertBefore(newForm, insertBefore)

    this.addhandlers(newForm)
  }

  addhandlers (form) {
    form.querySelector('.closeButton').onclick = this.removeForm.bind(this, form)
    form.querySelector('form').onsubmit = this.createColumn.bind(this, form)
  }

  removeForm (form) {
    form.remove()
  }

  createColumn (form) {
    let name = form.querySelector('textarea').value;
    let elToClone = document.getElementById('columnInstance');
    let newColumn = elToClone.cloneNode(true);
    let insertBefore = document.getElementById('addColumnButton');

    newColumn.classList.remove('hidden')
    newColumn.removeAttribute('id')
    newColumn.querySelector('h3').innerHTML = name
    document.getElementById('container').insertBefore(newColumn, insertBefore)

    form.remove()
    this.entryHandler.addListeners()
  }
}

module.exports = AddColumnHandler
