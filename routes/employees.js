const express = require('express')
const router = express.Router()
const DB = require('../lib/db')

router.get('/employees', (req, res) => {
    let sql = "SELECT * FROM employees"
    let query = DB.query(sql, (err, rows) =>{
	    res.render('employees', { title: 'Home', employees: rows })

    })
})

module.exports = router
