(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

const AddEntryHandler = require('./addentryhandler');
const AddColumnHandler = require('./addcolumnhandler');

const entryHandler = new AddEntryHandler('entryForm')
const columnHandler = new AddColumnHandler('addColumnButton', entryHandler)

},{"./addcolumnhandler":1,"./addentryhandler":2}]},{},[3]);
