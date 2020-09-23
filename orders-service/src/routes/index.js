const express = require('express')
const routes = express()

const orders = require('./orders')

routes.use('/', orders)

module.exports = routes