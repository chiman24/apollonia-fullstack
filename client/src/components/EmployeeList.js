import React, { useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Paper, List, ListItem, ListItemText, IconButton, 
  Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { getDepartments } from '../services/api';


const EmployeeList = ({employees, onDelete, onEdit}) => {
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({});
    const [departments, setDepartments] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);

  // Handle entering edit mode
  const handleEditClick = (employee) => {
    setEditingEmployeeId(employee._id);
    setEditedEmployee(employee);  // Set the employee to edit
    setSelectedDepartments(employee.departments.map((dept) => dept._id));
  };

  // Handle form field change
  const handleChange = (e) => {
    setEditedEmployee({
      ...editedEmployee,
      [e.target.name]: e.target.value
    });
  };

  // Handle save changes
  const handleSave = () => {
    console.log('In handleSave:', editedEmployee);
    onEdit(editedEmployee);
    setEditingEmployeeId(null);
  };

  // Handle cancel editing
  const handleCancel = () => {
    setEditingEmployeeId(null);
    setEditedEmployee({});  // Reset the form
  };

  // Handle opening the delete confirmation dialog
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  // Handle closing the confirmation dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  // Handle confirming the deletion
  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      onDelete(selectedEmployee._id);  // Pass employee ID to the onDelete function in the parent component
    }
    handleClose();
  };

  // Handle multi-select department changes
  const handleDepartmentChange = (e) => {
    setSelectedDepartments(e.target.value);
    
    //if e.target.value is an array, then we can use it directly
    if (Array.isArray(e.target.value)) {
        setEditedEmployee({
        ...editedEmployee,
        departments: e.target.value
        });
    }
    else {
        //if e.target.value is not an array, then we need to convert it to an array
        setEditedEmployee({
        ...editedEmployee,
        departments: [e.target.value]
        });
    }
  };

  useEffect(() => {
    // Fetch departments when the component mounts
    getDepartments().then((data) => setDepartments(data));
  });

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, width: 700 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{fontWeight: 'bold'}}>
        Employee List
      </Typography>
      <Box sx={{ overflowY: 'auto', height: '400px'}}> {/*Scrollable Box */}
      
      {employees.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          <b><i>There are currently no employees in the database.</i></b>
        </Typography>
      ) : (
        <>
        {employees.map((emp) => (
            <Paper key={emp._id} sx={{ padding: 1, marginBottom: 3}}>
                <List>
                {editingEmployeeId === emp._id ? (
                    <ListItem key={emp._id} secondaryAction={
                        <>
                            <IconButton edge="end" onClick={handleCancel}>
                                <CancelIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={handleSave}>
                                <SaveIcon />
                            </IconButton>
                        </>
                    }>
                    <TextField
                      name="name"
                      label="Name"
                      value={editedEmployee.name || ''}
                      onChange={handleChange}
                    />
                    <TextField
                      name="surname"
                      label="Surname"
                      value={editedEmployee.surname || ''}
                      onChange={handleChange}
                    />
                
                <FormControl fullWidth>
                    <InputLabel>Departments</InputLabel>
                    <Select sx={{ width: 200 }}
                        multiple={true}
                        value={selectedDepartments}
                        // value={editedEmployee.departments}
                        onChange={handleDepartmentChange}
                        // onChange={handleChange}
                        label="Departments"
                        name="departments"
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

                  </ListItem>
                  ) : (
                    <ListItem key={emp._id} secondaryAction={
                        <>
                          <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(emp) }>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(emp)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }>
                      <ListItemText primary={`${emp.name} ${emp.surname}`} />
                      </ListItem>
                )}
              </List>
            </Paper>
          ))}
      </>
    )}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete employee: <b>{selectedEmployee?.name} {selectedEmployee?.surname}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeList;
