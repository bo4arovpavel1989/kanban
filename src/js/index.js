'use strict';

const AddEntryHandler = require('./addentryhandler');
const AddColumnHandler = require('./addcolumnhandler');

const entryHandler = new AddEntryHandler('entryForm')
const columnHandler = new AddColumnHandler('addColumnButton', entryHandler)
