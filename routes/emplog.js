const express = require('express')
const router = express.Router()
const DB = require('../lib/db')

router.get('/emplog', (req, res) => {
    res.send('emp login works')
})

module.exports = router