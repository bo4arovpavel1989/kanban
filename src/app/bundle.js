(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class AddEntryHandler {
  constructor (className) {
    this.selector = className;
    this.addListeners();
  }

  addListeners () {
    let forms = document.getElementsByClassName(this.selector)

    for (let i = 0; i < forms.length; i++) {
       forms[i].querySelector('.addButtons').addEventListener('click', this.handleAddClick)
       forms[i].querySelector('.closeButton').addEventListener('click', this.handleCloseClick)
    }
  }

  handleAddClick (e) {
    this.parentElement.querySelector('form').classList.toggle('hidden')
    this.classList.toggle('hidden')
  }

  handleCloseClick (e) {
    this.parentElement.parentElement.classList.toggle('hidden')
    this.parentElement.parentElement.nextElementSibling.classList.toggle('hidden')
  }
}

module.exports = AddEntryHandler;

},{}],2:[function(require,module,exports){
'use strict';

const AddEntryHandler = require('./addentryhandler')

const entryHandler = new AddEntryHandler('entryForm')

},{"./addentryhandler":1}]},{},[2]);
