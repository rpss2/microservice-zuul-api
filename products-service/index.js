const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./src/routes')

const PORT = 5000

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.status(200).json({message: 'Products Service OK!'})
})

app.use('/', routes)

app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`)
})