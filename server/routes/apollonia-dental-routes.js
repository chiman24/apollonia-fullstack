 module.exports = app => {
   var router = require("express").Router();
    const departmentController = require('../controllers/department-controller');
    const employeeController = require('../controllers/employee-controller');

    // Create a new Department
    router.post('/department', departmentController.createDepartment);

    // Fetch all Departments
    router.get('/departments', departmentController.fetchAllDepartments);

    // Update a Department
    router.put('/department/:id', departmentController.updateDepartment);

    // Delete a Department
    router.delete('/department/:id', departmentController.deleteDepartment);

    //Create a new Employee
    router.post('/employee', employeeController.createEmployee);

    //Delete an Employee
    router.delete('/employee/:id', employeeController.deleteEmployee);

    //Fetch all Employees
    router.get('/employees', employeeController.fetchAllEmployees);

    //Update an Employee
    router.put('/employee/:id', employeeController.updateEmployee);

    app.use('/api/apollonia-dental-practice', router);
 }