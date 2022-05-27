
const express = require('express')

const EmployeeCtrl = require('../controllers/employee')

const router = express.Router()

router.post('/', EmployeeCtrl.createEmployee)
router.put('/:id', EmployeeCtrl.updateEmployee)
router.delete('/:id', EmployeeCtrl.deleteEmployee)
router.get('/:id', EmployeeCtrl.getEmployeeById)
router.get('/', EmployeeCtrl.getEmployees)
router.get('/home/page', EmployeeCtrl.homeView)

module.exports = router