const express = require('express')
const router = express.Router()
const DB = require('../lib/db')

router.get('/employees', (req, res) => {
    let sql = `select employees.id, employees.frst_nm, employees.lst_nm, employees.dept_id, departments.dept_type
    from employees join departments on employees.dept_id = departments.id`
    let query = DB.query(sql, (err, result) =>{
        if (err) throw err
	    res.render('employees', { title: 'Home', employees: result })

    })
})

router.get('/employees/edit/:id', (req, res) =>{
    const id = req.params.id
    let sql = `Select * from payroll.employees where id = ${id}`
    let query = DB.query(sql, (err, result) =>{
        if (err) throw err      
        res.render('edit', {title: 'Edit Page', employees: result[0] })
    })
})

router.post('/update', (req, res)=> {
    const id = req.body.id
    const fname = req.body.fname
    const lname = req.body.lname
    let sql = `Update employees set frst_nm = '${fname}', lst_nm = '${lname}' where id = ${id}`
    let query = DB.query(sql, (err, results) =>{
        if (err) throw err
        res.redirect('/employees')
    })
})



module.exports = router
