// Description: This file contains the logic to handle requests from the department routes.
const {Department} = require('../mongoose/employee-department-model');

// Create a new department
const createDepartment = async (req, res) => {
    // Extract department details from request body
    const { name, description } = req.body;

    // Create a new department
    const newDepartment = new Department({ name, description });
    try {
        await newDepartment.save();
        // Send a response back to the client
        return res.status(201).json({
            message: 'Department created successfully',
            department: newDepartment
        });
    } catch (error) {
        console.error('Error creating department:', error);
        return res.status(500).json({
            message: 'Failed to create department',
            error: error.message
        });
    }
};

//Fetch all departments
const fetchAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('employees');
        return res.status(200).json(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        return res.status(500).json({
            message: 'Failed to fetch departments',
            error: error.message
        });
    }
};

//Update a department
const updateDepartment = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Department.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Department with id=${id}. Maybe Department was not found!`
          });
        } else res.send({ message: "Department was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Department with id=" + id
        });
      });
};

//Delete a department
const deleteDepartment = async (req, res) => {
    const id = req.params.id;

    Department.findByIdAndDelete(id, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
            });
        } else {
            res.send({
            message: "Department was deleted successfully!"
            });
        }
    })
};


module.exports = {
    createDepartment,
    fetchAllDepartments,
    updateDepartment,
    deleteDepartment
};