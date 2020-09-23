const express = require('express')
const routes = express()

const products = require('./products')

routes.use('/products', products)

module.exports = routes