const express = require('express')
const router = express.Router()
const session = require('express-session')
const bcrypt = require('bcrypt')
const DB = require('../lib/db')

router.get('/emplog', (req, res) => {
    res.send('emp login works')
})

module.exports = router