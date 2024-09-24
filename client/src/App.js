import React, { useState, useEffect } from 'react';
import EmployeeManagement from './components/EmployeeManagement';
import DepartmentManagement from './components/DepartmentManagement';
import { getDepartments, getEmployees, deleteEmployee, 
         updateEmployee, deleteDepartment, updateDepartment } from './services/api';
import { Box, Container, Typography, Divider, Tabs, Tab } from '@mui/material';

function TabPanel({ children, value, index}) {
  
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

function App() {
  const [tabIndex, setTabIndex] = useState(0); // Manage the active tab
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      // Call the API to delete the employee
      await deleteEmployee(employeeId);  // This should be the API call to delete the employee

      // After deleting, re-fetch the employee and department lists to refresh the UI
      await fetchEmployees();
      await fetchDepartments();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditEmployee = async (employee) => {
    try {
        console.log('In handleEditEmployee:', employee);
        await updateEmployee(employee._id, employee);

        //Add a short delay to account for database processing time
        await new Promise((resolve) => setTimeout(resolve, 200));

      // After updating, re-fetch the employee and department lists to refresh the UI
      await fetchEmployees();
      await fetchDepartments();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  }

  const handleEditDepartment = async (department) => {
    try {
        // console.log(employee);
        await updateDepartment(department._id, department);

        //Add a short delay to account for database processing time
        await new Promise((resolve) => setTimeout(resolve, 200));

      // After updating, re-fetch the employee and department lists to refresh the UI
      await fetchEmployees();
      await fetchDepartments();
    } catch (error) {
      console.error("Error updating department:", error);
    }
  }

  // Fetch departments with employees
  const fetchDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data);
  };

  // Fetch employees grouped by department
  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  // Fetch data initially when the app loads
  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  // Function to be passed to EmployeeForm to refresh data after new employee creation
  const handleEmployeeCreated = async () => {
     // For some reason, both departments and employees need to be fetched
     // in order to update the EmployeeList UI after a new employee is created.
     // This is a workaround to refresh the data.
     // It may have something to do with the way the data is modeled - 
     // i.e. a circular reference. (departments have employees and employees have departments).
     await fetchDepartments(); 
     await fetchEmployees();
  };

  const handleDepartmentCreated = async () => {
    await fetchDepartments();
  }

  const handleDeleteDepartment = async (departmentId) => {
    try {
      // Call the API to delete the department
      await deleteDepartment(departmentId);  // This should be the API call to delete the department

      // After deleting, re-fetch the employee and department lists to refresh the UI
      await fetchEmployees();
      await fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Main Title */}
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" gutterBottom>
          Apollonia Dental Employee Management
        </Typography>
        <Divider />
      </Box>

       {/* Tabs Navigation */}
       <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Manage Employees" />
        <Tab label="Manage Departments" />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={tabIndex} index={0}>
        {/* Manage Employees Tab */}
        <EmployeeManagement employees={employees} 
                            departments={departments} 
                            onEmployeeCreated={handleEmployeeCreated} 
                            onDelete={handleDeleteEmployee} 
                            onEdit={handleEditEmployee}/>
      </TabPanel>

      {/* Manage Departments Tab */}
      {<TabPanel value={tabIndex} index={1}>
        <DepartmentManagement departments={departments} 
                              onDepartmentCreated={handleDepartmentCreated} 
                              onDelete={handleDeleteDepartment}
                              onEdit={handleEditDepartment}/>
      </TabPanel> }

    </Container>
  );
}

export default App;
