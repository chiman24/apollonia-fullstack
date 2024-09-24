// import React, { useState, useEffect } from 'react';
// import { getEmployees } from '../services/api';

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     // Fetch employees when the component mounts
//     getEmployees().then((data) => setEmployees(data));
//   }, []);

//   return (
//     <div>
//       <h3>Employee List</h3>
//       {employees.map((emp) => (
//         <div key={emp._id}>
//           <h4>{emp.name} {emp.surname}</h4>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EmployeeList;
