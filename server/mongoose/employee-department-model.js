// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    employees: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false}
        // {employeeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false}},
        // {name: {type: String, required: false}},
        // {surname: {type: String, required: false}}
    ]
    
},
{ timestamps: true }
);

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    departments: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: false}
        // {departmentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Department'}},
        // {name: {type: String}},
        // {description: {type: String}}
    ]
},
{ timestamps: true }
);



const Department = mongoose.model('Department', DepartmentSchema);
const Employee = mongoose.model('Employee', EmployeeSchema);

// export { Department, Employee };
module.exports = { Department, Employee };
