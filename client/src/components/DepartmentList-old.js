// import React, { useState, useEffect } from 'react';
// import { getDepartments } from '../services/api';

// const DepartmentList = () => {
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     // Fetch departments with employees
//     // getDepartmentsWithEmployees().then((data) => setDepartments(data));
//     getDepartments().then((data) => setDepartments(data));
//   }, []);

//   return (
//     <div>
//       <h3>Departments and Employees</h3>
//       {departments.map((dept) => (
//         <div key={dept._id}>
//           <h4>{dept.name}</h4>
//           <ul>
//             {dept.employees.map((emp) => (
//               <li key={emp._id}>{`${emp.name} ${emp.surname}`}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DepartmentList;
