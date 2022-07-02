const express = require('express')
const router = express.Router()
const session = require('express-session')
const bcrypt = require('bcrypt')
const DB = require('../lib/db')


//get register route
router.get('/empreg', (req,res) =>{
    res.render('empreg', {title: 'employee reg'})
})

//post register route for changes
router.post('/empreg', async (req,res)=>{
                  
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
                            
        let data = {
            frst_nm: req.body.fname,
            lst_nm: req.body.lname,
            username: req.body.uname,
            password: hashedPassword,
            dept_id: req.body.dept
        }
        let sql = "INSERT INTO employees SET ?"
        let query = DB.query(sql, data, (err, results) =>{
                                if(err) throw err
                                res.redirect('/emplog')
    
            })
    
})



router.get('/emplog', (req, res) => {
    res.render('emplog', {title: 'emp login'})
})

router.post('/login',(req,res)=>{
    
    let uname = req.body.uname;
    let plainPassword = req.body.password;
    
    DB.query(`select employees.username, employees.password, employees.id, employees.frst_nm, employees.lst_nm, dept_type, hrs_worked, work_hrs, sick_days, departments.rate,
    if( hrs_worked > work_hrs, hrs_worked - work_hrs, 0) as overtime, (departments.rate * hrs_worked) as pay
    from employees join payscale
    on employees.id = payscale.emp_id
    join departments
    on employees.dept_id = departments.id  where username = "${uname}"`, async (error, results,fields)=>{
      if (error) throw error
        if(results.length > 0 && await bcrypt.compare(plainPassword, results[0].password)){
        
          req.session.loggedin = true;
            res.render('more', {title: 'emp view', employee: results[0]})
            req.session.username = uname;
        }
  
        else{
          req.flash('error', 'no employee found')
          req.session.loggedin = false;
        }
        res.end()
    })
    
  })

module.exports = router