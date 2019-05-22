/* Class defining addColumn form handler */
class AddColumnHandler {
  constructor (selector, entryHandler) {
    this.selector = selector
    this.entryHandler = entryHandler
    this.addListeners()
  }

  /**
    * Method adds listener for calling control buttons of addColum form
    * @returns {void}
    */
  addListeners () {
    let form = document.getElementById(this.selector);

    form.onclick = this.handleClick.bind(this)
  }

  /**
    * Method handles click on control button of addColumn form
    * It creates form by cloning instance if hidden form and inserts it in document
    * @return {void}
    */
  handleClick () {
    let formToClone = document.getElementById('columnForm');
    let insertBefore = document.getElementById('addColumnButton');
    let newForm = formToClone.cloneNode(true);

    newForm.classList.remove('hidden')
    newForm.removeAttribute('id')
    document.getElementById('container').insertBefore(newForm, insertBefore)

    this.addhandlers(newForm)
  }

  /**
    * Method adds handlers for newly created addColumn form
    * @returns {void}
    */
  addhandlers (form) {
    form.querySelector('.closeButton').onclick = this.removeForm.bind(this, form)
    form.querySelector('form').onsubmit = this.createColumn.bind(this, form)
  }

  /**
    * Method removesnewly created column
    * @return {void}
    */
  removeForm (form) {
    form.remove()
  }

  /**
    * Method creates new column by cloning its hidden instance and inserting in document
    * in the end addColumn form is removed
    * @return {void}
    */
  createColumn (form) {
    let name = form.querySelector('textarea').value;
    let elToClone = document.getElementById('columnInstance');
    let newColumn = elToClone.cloneNode(true);
    let insertBefore = document.getElementById('addColumnButton');

    newColumn.classList.remove('hidden')
    newColumn.removeAttribute('id')
    newColumn.querySelector('h3').innerHTML = name

    newColumn.ondrop = this.entryHandler.dragManager.dragDrop
    newColumn.ondragenter = this.entryHandler.dragManager.dragEnter
    newColumn.ondragover = this.entryHandler.dragManager.dragOver

    document.getElementById('container').insertBefore(newColumn, insertBefore)

    form.remove()
    this.entryHandler.addListeners()
  }
}

module.exports = AddColumnHandler
