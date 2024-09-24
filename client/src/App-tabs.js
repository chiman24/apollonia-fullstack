import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import DepartmentList from './components/DepartmentList';
import EmployeeList from './components/EmployeeList';
import { getEmployees } from './services/api';
import { Box, Tabs, Tab, Container, Typography, Divider } from '@mui/material';

// TabPanel Component for showing tab content
function TabPanel({ children, value, index, ...otherProps }) {
  
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabIndex, setTabIndex] = useState(0); // Manage the active tab
  const [employees, setEmployees] = useState([]);


  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Fetch employees grouped by department
  const fetchEmployees = async () => {
    const data = await getEmployees();
    console.log(data);
    setEmployees(data);
  };

  // Fetch data initially when the app loads
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeCreated = async () => {
    // Re-fetch employees
    await fetchEmployees();
 };

  return (
    <Container maxWidth="md">
      {/* Header */}
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
      {/* <TabPanel value={tabIndex} index={0} employees={employees}> */}
        {/* Manage Employees Tab */}
        <EmployeeForm onEmployeeCreated={handleEmployeeCreated} />
        <EmployeeList employees={employees} />
      {/* </TabPanel> */}

      <TabPanel value={tabIndex} index={1}>
        {/* Manage Departments Tab */}
        <DepartmentList departments={[]} />
      </TabPanel>
    </Container>
  );
}

export default App;
