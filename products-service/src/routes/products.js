const fs = require('fs');
const express = require('express')

const router = express.Router()

const data = require('../data/products.json')

router.get('/', function (req, res) {
    return res.status(200).json(data)
})

router.get('/:sku', function(req, res) {
    const {
        sku
    } = req.params

    let r = data.products.filter(p => {
        return p.sku === sku
    })

    if(r.length === 1) return res.status(200).json(r)

    return res.status(404).json({message: `Product with ${sku} not found!`})
})

module.exports = router