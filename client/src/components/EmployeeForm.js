import React, { useState, useEffect } from 'react';
import { getDepartments, createEmployee } from '../services/api';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Box,
} from '@mui/material';

const EmployeeForm = ({onEmployeeCreated}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments when the component mounts
    getDepartments().then((data) => setDepartments(data));
  }, []);

  // Handle multi-select department changes
  const handleDepartmentChange = (e) => {
    setSelectedDepartments(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass the selected departments array to the createEmployee function
    createEmployee({
      name,
      surname,
      departments: selectedDepartments,
    });

    //Add a short delay to account for database processing time
    //to add new employee to existing departments.
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Call the parent component's function to refresh the data
    onEmployeeCreated();

    // Reset the form after submission
    setName('');
    setSurname('');
    setSelectedDepartments([]);
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          mt: '32px',
          padding: '24px',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <h3>Create New Employee</h3>

        {/* First Name Input */}
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Last Name Input */}
        <TextField
          label="Surname"
          variant="outlined"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />

        {/* Departments Multi-Select */}
        <FormControl fullWidth>
          <InputLabel>Departments</InputLabel>
          <Select
            multiple={true}
            value={selectedDepartments}
            onChange={handleDepartmentChange}
            label="Departments"
            renderValue={(selected) =>
              selected
                .map((deptId) => departments.find((d) => d._id === deptId)?.name)
                .join(', ')
            }
          >
            {departments.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit">
          Create Employee
        </Button>
      </Box>
    </Container>
  );
};

export default EmployeeForm;
