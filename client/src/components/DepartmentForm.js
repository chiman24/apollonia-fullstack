import React, { useState, useEffect } from 'react';
import { createDepartment } from '../services/api';
import {
  Container,
  TextField,
  Button,
  Box,
} from '@mui/material';

const DepartmentForm = ({onDepartmentCreated}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch departments when the component mounts
    // getDepartments().then((data) => setDepartments(data));
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass the selected departments array to the createEmployee function
    createDepartment({
      name,
      description
    });

    //Add a short delay to account for database processing time
    //to add new employee to existing departments.
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Call the parent component's function to refresh the data
    onDepartmentCreated();

    // Reset the form after submission
    setName('');
    setDescription('');
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
        <h3>Create New Department</h3>

        {/* Name Input */}
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Description Input */}
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit">
          Create Department
        </Button>
      </Box>
    </Container>
  );
};

export default DepartmentForm;
