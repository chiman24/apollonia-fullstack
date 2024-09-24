
const {Employee} = require('../mongoose/employee-department-model');
const {Department} = require('../mongoose/employee-department-model');

//Create an Employee
const createEmployee = async (req, res) => {
    // Extract employee data from request body
    const { name, surname, departments } = req.body;

    try {
        // Save employee data to the database
        const newEmployee = new Employee({ name, surname, departments });
        await newEmployee.save();

        // Send a response back to the client
        // res.status(201).json({
        //     message: 'Employee created successfully',
        //     employee: {
        //         name,
        //         surname,
        //         departments
        //     }
        // });

        //Add employee to departments
        await addEmployeeToDepartments(departments, res, newEmployee);
    } catch (error) {
        // Handle any errors that occur during the save operation
        res.status(500).json({
            message: 'An error occurred while creating the employee',
            error: error.message
        });
    }

};

//Fetch all employees
const fetchAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('departments');
        return res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        return res.status(500).json({
            message: 'Failed to fetch employees',
            error: error.message
        });
    }
};

//Update an Employee
const updateEmployee = async (req, res) => {
    if (!req.body) {
        console.log("In 404 section")
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    const employee = req.body;

    Employee.findByIdAndUpdate(id, employee, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
                });
            } else {
                // res.send({ message: "Employee was updated successfully." });
                //Add employee to departments
                addEmployeeToDepartments(employee.departments, res, employee);
            }
        })
        .catch(err => {
            console.log(`In catch: ${err}`);
            res.status(500).send({
                message: "Error updating Employee with id=" + id
            });
        });
};

//Delete an Employee
const deleteEmployee = async (req, res) => {
    const id = req.params.id;

    Employee.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
                });
            } else {
                res.send({
                    message: "Employee was deleted successfully!"
                });

                //Remove employee from departments
                removeEmployeeFromDepartments(data, res, id);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id=" + id
            });
        });
};

//Add employee to departments
async function addEmployeeToDepartments(departments, res, employee) {
    departments.forEach(async (departmentId) => {
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({
                message: 'Department not found'
            });
        }
        //if the employee is already in this department, skip
        if (department.employees.includes(employee._id)) {
            return;
        }
        else {
            department.employees.push(employee._id);
        }
       
        await department.save();
    });
}

//Remove employee from departments
function removeEmployeeFromDepartments(data, res, id) {
    data.departments.forEach(async (departmentId) => {
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({
                message: 'Department not found'
            });
        }
        department.employees = department.employees.filter(employee => employee.toString() !== id);
        await department.save();
    });
}

module.exports = {
    createEmployee,
    deleteEmployee,
    fetchAllEmployees,
    updateEmployee
};
