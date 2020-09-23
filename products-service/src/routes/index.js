const express = require('express')
const routes = express()

const products = require('./products')

routes.use('/', products)

module.exports = routes