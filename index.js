const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const employeeRouter = require('./routes/employees')

const EmployeeCtrl = require('./controllers/employee')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function(){
    // we are connected to Database
    console.log('Connected to MongoDB');
})

app.use('/employees', employeeRouter)

app.use('/', (req, res) => {
    return res.status(200).json({
        'success' : true,
        data : 'This is home page for employee app'
    })
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))