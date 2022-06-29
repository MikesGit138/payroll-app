const express = require('express')
const router = express.Router()
const DB = require('../lib/db')

router.get('/employees', (req, res) => {
    let sql = `select employees.id, employees.frst_nm, employees.lst_nm, employees.dept_id, departments.dept_type
    from employees join departments on employees.dept_id = departments.id`
    let query = DB.query(sql, (err, rows) =>{
	    res.render('employees', { title: 'Home', employees: rows })

    })
})

router.get('/employees/edit', (req, res) =>{
    res.render('edit', {title: 'Edit Page'})
})



module.exports = router
