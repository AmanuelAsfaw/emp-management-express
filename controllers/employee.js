const Employee = require('../models/employee')

createEmployee = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Employee data',
            message: 'You must provide a Employee data',
        })
    }

    const employee = new Employee(body)

    if (!employee) {
        return res.status(400).json({ success: false, error: err })
    }

    employee
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                employee: employee,
                message: 'Employee created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                success: false,
                message: 'Employee not created!',
            })
        })
}

updateEmployee = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Employee.findOne({ _id: req.params.id }, (err, employee) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Employee not found!',
            })
        }
        employee.name = body.name
        employee.birth_date = body.birth_date
        employee.gender = body.gender
        employee.salary = body.salary
        employee
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    employee: employee,
                    message: 'Employee updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Employee not updated!',
                })
            })
    })
}

deleteEmployee = async (req, res) => {
    await Employee.findOneAndDelete({ _id: req.params.id }, (err, employee) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!employee) {
            return res
                .status(404)
                .json({ success: false, error: `Employee not found` })
        }
        return res.status(200).json({ success: true, employee: employee , message: 'Employee removed!'})
    }).catch(err => console.log(err))
}

getEmployeeById = async (req, res) => {
    await Employee.findOne({ _id: req.params.id }, (err, employee) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!employee) {
            return res
                .status(404)
                .json({ success: false, error: `Employee not found` })
        }
        return res.status(200).json({ success: true, data: employee })
    }).catch(err => console.log(err))
}

getEmployees = async (req, res) => {
    await Employee.find({}, (err, employees) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!employees.length) {
            return res
                .status(404)
                .json({ success: false, error: `Employee not found` })
        }
        return res.status(200).json({ success: true, data: employees })
    }).catch(err => console.log(err))
}

homeView = async (req, res) => {
    return res.status(200).json({ success: true, data: 'This is home page for employee app'})
}

module.exports = {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeById,
    homeView,
}
