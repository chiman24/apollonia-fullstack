import React from 'react';
import { Box, Paper } from '@mui/material';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

const EmployeeManagement = ({ employees, onEmployeeCreated, onDelete, onEdit }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, height: '500px' }}>
      {/* Employee Form */}
      <Paper elevation={3} sx={{ flex: 1, padding: 2 }}>
        <EmployeeForm onEmployeeCreated={onEmployeeCreated} />
      </Paper>

      {/* Employee List */}
      <Paper elevation={3} sx={{ flex: 1, padding: 2 }}>
        <EmployeeList employees={employees} onDelete={onDelete} onEdit={onEdit} />
      </Paper>
    </Box>
  );
};

export default EmployeeManagement;
