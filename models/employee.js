const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema(
    {
        name: { type: String, required: true },
        birth_date: { type: Date, required: true },
        gender: { type: String, required: true },
        salary: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('employees', EmployeeSchema)