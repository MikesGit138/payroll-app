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
    let sql = `Select * from payroll.payscale where emp_id = ${id}`
    let query = DB.query(sql, (err, result) =>{
        if (err) throw err      
        res.render('edit', {title: 'Edit Page', payscale: result[0] })
    })
})

router.post('/update', (req, res)=> {
    const emp_id = req.body.emp_id
    const sdays = req.body.sdays
    const hwork = req.body.hwork
    let sql = `Update payroll.payscale set sick_days = ${sdays}, hrs_worked = ${hwork} where emp_id = ${emp_id}`
    let query = DB.query(sql, (err, results) =>{
        if (err) throw err
        res.redirect('/employees')
    })
})

router.get('/employees/more/:id', (req, res) => {
    const id = req.params.id
    let sql = `select employees.id, employees.frst_nm, employees.lst_nm, dept_type, hrs_worked, work_hrs, sick_days, departments.rate,
    if( hrs_worked > work_hrs, hrs_worked - work_hrs, 0) as overtime, (departments.rate * hrs_worked) as pay
    from employees join payscale
    on employees.id = payscale.emp_id
    join departments
    on employees.dept_id = departments.id 
    where employees.id = ${id}`
    let query = DB.query(sql, (err, results) =>{
        if (err) throw err
        res.render('more', {title: 'More', employee: results[0]})

    })
})

module.exports = router
