import React from 'react';
import { Box, Paper } from '@mui/material';
import DepartmentForm from './DepartmentForm';
import DepartmentList from './DepartmentList';

const DepartmentManagement = ({ departments, onDepartmentCreated, onDelete, onEdit }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, height: '500px' }}>
      {/* Department Form */}
      <Paper elevation={3} sx={{ flex: 1, padding: 2 }}>
        <DepartmentForm onDepartmentCreated={onDepartmentCreated} />
      </Paper>

      {/* Department List */}
      <Paper elevation={3} sx={{ flex: 1, padding: 2 }}>
        <DepartmentList departments={departments} onDelete={onDelete} onEdit={onEdit}/>
      </Paper>
    </Box>
  );
};

export default DepartmentManagement;
