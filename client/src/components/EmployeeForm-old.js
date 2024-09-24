// import React, { useState, useEffect } from 'react';
// import { getDepartments, createEmployee } from '../services/api';

// const EmployeeForm = () => {
//   const [name, setName] = useState('');
//   const [surname, setSurname] = useState('');
// //   const [department, setDepartment] = useState('');
//   const [selectedDepartments, setSelectedDepartments] = useState('');
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     // Fetch departments when the component mounts
//     getDepartments().then((data) => setDepartments(data));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createEmployee({ name, surname, selectedDepartments });
//     // Reset the form after submission
//     setName('');
//     setSurname('');
//     setSelectedDepartments('');
//   };

//   const handleDepartmentChange = (e) => {
//     const options = e.target.options;
//     const selected = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selected.push(options[i].value);
//       }
//     }
//     setSelectedDepartments(selected);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Create New Employee</h3>
//       <div>
//         <label>First Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Last Name</label>
//         <input
//           type="text"
//           value={surname}
//           onChange={(e) => setSurname(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Department</label>
//         <select multiple={true} value={selectedDepartments} onChange={handleDepartmentChange} required>
//           <option value="">Select Department</option>
//           {departments.map((dept) => (
//             <option key={dept._id} value={dept._id}>
//               {dept.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button type="submit">Create Employee</button>
//     </form>
//   );
// };

// export default EmployeeForm;
