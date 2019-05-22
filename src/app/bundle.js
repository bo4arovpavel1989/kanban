(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const DragManager = require('./dragmanager')

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

},{"./dragmanager":3}],2:[function(require,module,exports){
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
    form.previousElementSibling.appendChild(entry)
  }
}

module.exports = AddEntryHandler

},{"./dragmanager":3}],3:[function(require,module,exports){
class DragManager {
  dragStart (e) {
    e.target.setAttribute('id', 'isMoved')
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('Text', e.target.getAttribute('id'))

    return true;
  }

  dragEnter (e) {
    e.preventDefault()

    return true;
  }

  dragOver (e) {
    e.preventDefault()
  }

  dragDrop (e) {
    let data = e.dataTransfer.getData('Text');

    e.target.closest('.columnContainer')
            .querySelector('.entries')
            .prepend(document.getElementById(data))

    e.stopPropagation()

    document.getElementById(data).removeAttribute('id')

    return false;
  }
}

module.exports = DragManager

},{}],4:[function(require,module,exports){
'use strict';

const AddEntryHandler = require('./addentryhandler');
const AddColumnHandler = require('./addcolumnhandler');

const entryHandler = new AddEntryHandler('entryForm')
const columnHandler = new AddColumnHandler('addColumnButton', entryHandler)

},{"./addcolumnhandler":1,"./addentryhandler":2}]},{},[4]);
