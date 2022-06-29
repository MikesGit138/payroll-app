const express = require('express')
const router = express.Router()
const DB = require('../lib/db')

router.get('/employees', (req, res) => {
    let sql = `select employees.id, employees.frst_nm, employees.lst_nm, employees.dept_id, departments.dept_type
    from employees join departments on employees.dept_id = departments.id`
    let query = DB.query(sql, (err, result) =>{
	    res.render('employees', { title: 'Home', employees: result })

    })
})

// router.get('/employees/edit/:empId', (req, res) =>{
//     let empId = req.params.id
//     let sql = `Select * from employees where id = ${empId}`
//     let query = DB.query(sql , (err, result) =>{
//         if (err) throw err      
//         res.render('edit', {title: 'Edit Page' , employees: result })
//     })
// })

// router.post('/update', (req, res)=> {
//     const empId = req.body.id
//     const fname = req.body.fname
//     const lname = req.body.lname
//     let sql = `Update employees set frst_nm`
// })



module.exports = router
