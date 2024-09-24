import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Paper, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Button, TextField
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const DepartmentList = ({departments, onDelete, onEdit}) => {
    const [open, setOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [editingDepartmentId, setEditingDepartmentId] = useState(null);
    const [editedDepartment, setEditedDepartment] = useState({});

   const handleEditClick = (department) => {
    setEditingDepartmentId(department._id);
    setEditedDepartment(department);  // Set the department to edit
   };

  // Handle opening the delete confirmation dialog
  const handleDeleteClick = (department) => {
    setSelectedDepartment(department);
    setOpen(true);
  };

  // Handle closing the confirmation dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedDepartment(null);
  };

  // Handle confirming the deletion
  const handleConfirmDelete = () => {
    if (selectedDepartment) {
      onDelete(selectedDepartment._id);  // Pass department ID to the onDelete function in the parent component
    }
    handleClose();
  };

  // Handle save changes
  const handleSave = () => {
    onEdit(editedDepartment);
    setEditingDepartmentId(null);
  };

  // Handle cancel editing
  const handleCancel = () => {
    setEditingDepartmentId(null);
    setEditedDepartment({});  // Reset the form
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{fontWeight: 'bold'}}>
        Departments and Employees
      </Typography>
      <Box sx={{ overflowY: 'auto', height: '400px' }}>
      {departments.map((dept) => (
        <Paper key={dept._id} sx={{ padding: 2, marginBottom: 3 }}>
          <List>
            {editingDepartmentId === dept._id ? (
            
            <ListItem key={dept._id} secondaryAction={
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
                type="text"
                value={editedDepartment.name}
                onChange={(e) => setEditedDepartment({ ...editedDepartment, name: e.target.value })}
              />    
             
            </ListItem>) : (
                <ListItem key={dept._id} secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(dept)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(dept)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                    }>
                <ListItemText primary={dept.name} 
                            primaryTypographyProps={{ sx: {fontWeight: 'bold'}}}/>
                </ListItem>)
            }
          </List>
          <Divider />
          {dept.employees.length > 0 ? (
          <List>
            {dept.employees.map((emp) => (
              <ListItem key={emp._id}>
                <ListItemText sx={{paddingLeft: 2}}
                  primary={`${emp.name} ${emp.surname}`}
                />
              </ListItem>
            ))}
          </List> ) : (
            <Typography variant="body2" sx={{ mt: 2, padding: 2}}>
              There are currently no employees in this department.
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete department: <b>{selectedDepartment?.name}</b>?
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

export default DepartmentList;
