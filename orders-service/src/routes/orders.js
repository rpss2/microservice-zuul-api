const fs = require('fs');
const express = require('express')
const axios = require('axios')

const router = express.Router()

const data = require('../data/orders.json')

router.get('/', function (req, res) {
    return res.status(200).json(data)
})

router.get('/:id', function(req, res) {
    const {
        id
    } = req.params

    let r = data.orders.filter(p => {
        return p.id == id
    })

    if(r.length === 1) return res.status(200).json(r)

    return res.status(404).json({message: `Order with ${id} not found!`})
})

router.get('/:id/products', async function(req, res) {
    const {
        id
    } = req.params

    let r = data.orders.filter(p => {
        return p.id == id
    })

    if(r.length === 0) return res.status(404).json({message: `Order with ${id} not found!`})

    let order = r[0]

    let products = order.products.map(p => {
        return new Promise((resolve, rejecct) => {
            axios.get(`http://products-service:5000/${p.sku}`).then(prod => {
                resolve(prod)
            })
            .catch(err => {
                rejecct(err)
            })
        })
    })

    let list = await Promise.all(products).then((values) => {
        return values.map(v => {
            return v.data
        })
    });

    return res.status(200).json(list)
    
})

module.exports = router