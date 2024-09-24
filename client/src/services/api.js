import axios from 'axios';

const API_URL = 'http://localhost:5001/api/apollonia-dental-practice'; // Adjust this to your actual backend API endpoint

export const getDepartments = async () => {
  const response = await axios.get(`${API_URL}/departments`);
  return response.data;
};

// export const getDepartmentsWithEmployees = async () => {
//   const response = await axios.get(`${API_URL}/departments/employees`);
//   return response.data;
// };

export const createEmployee = async (employeeData) => {
  const response = await axios.post(`${API_URL}/employee`, employeeData);
  return response.data;
};

export const createDepartment = async (departmentData) => {
    const response = await axios.post(`${API_URL}/department`, departmentData);
    return response.data;
  };

export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/employees`);
  return response.data;
};

export const deleteEmployee = async (employeeId) => {
    return await axios.delete(`${API_URL}/employee/${employeeId}`);
};

export const deleteDepartment = async (departmentId) => {
    return await axios.delete(`${API_URL}/department/${departmentId}`);
};

export const updateEmployee = async (employeeId, employeeData) => {
    const response = axios.put(`${API_URL}/employee/${employeeId}`, employeeData);
    return response.data;
};

export const updateDepartment = async (departmentId, departmentData) => {
    const response = axios.put(`${API_URL}/department/${departmentId}`, departmentData);
    return response.data;
};
  
