const compression = require('compression')
const express = require('express')
const app = express()

app.use(compression())
app.use(express.static(__dirname + '/dist'))

app.listen(9300)
