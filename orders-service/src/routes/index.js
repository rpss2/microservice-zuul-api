const express = require('express')
const routes = express()

const orders = require('./orders')

routes.use('/orders', orders)

module.exports = routes