// import React, { useEffect, useState } from "react";
// import "./Register1.css";

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [updatedStudent, setUpdatedStudent] = useState({
//     name: "",
//     email: "",
//     age: "",
//     dob: "",
//   });
//   const [entryCount, setEntryCount] = useState(0); // Counter for entry number

//   useEffect(() => {
//     getStudents();
//   }, []);

//   useEffect(() => {
//     // Save students to localStorage whenever students change
//     localStorage.setItem("students", JSON.stringify(students));
//   }, [students]);

//   const handleUpdateClick = (index, student) => {
//     setEditIndex(index);
//     setUpdatedStudent(student);
//   };

//   const handleSaveClick = async () => {
//     if (editIndex !== null) {
//       try {
//         await fetch(
//           `http://localhost:4000/api/v1/students/${students[editIndex].id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedStudent),
//           }
//         );
//         const updatedStudents = [...students];
//         updatedStudents[editIndex] = updatedStudent;
//         setStudents(updatedStudents);
//         setEditIndex(null);
//         setUpdatedStudent({
//           name: "",
//           email: "",
//           age: "",
//           dob: "",
//         });
//       } catch (err) {
//         console.error(err.message);
//       }
//     }
//   };

//   const getStudents = async () => {
//     try {
//       // Check if students exist in localStorage
//       const localStorageStudents = localStorage.getItem("students");
//       if (localStorageStudents) {
//         setStudents(JSON.parse(localStorageStudents));
//         setEntryCount(JSON.parse(localStorageStudents).length); // Set entry count based on retrieved students
//       } else {
//         const response = await fetch("http://localhost:4000/api/v1/students");
//         const jsonData = await response.json();
//         const formattedStudents = jsonData.map((student) => ({
//           ...student,
//           dob: new Date(student.dob).toLocaleDateString(),
//         }));
//         setStudents(formattedStudents);
//         setEntryCount(formattedStudents.length); // Set entry count based on fetched students
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const deleteStudent = async (id) => {
//     try {
//       await fetch(`http://localhost:4000/api/v1/students/${id}`, {
//         method: "DELETE",
//       });
//       setStudents(students.filter((student) => student.id !== id));
//       setEntryCount(entryCount - 1); // Update entry count after deletion
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <div>
//       <h1 className="ListHeading">Registered Student List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>S.NO</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Age</th>
//             <th>DOB</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student, index) => (
//             <tr key={student.id}>
//               <td>{entryCount - index}</td>
//               {/* Display sequential index number */}
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     value={updatedStudent.name}
//                     onChange={(e) =>
//                       setUpdatedStudent({
//                         ...updatedStudent,
//                         name: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   student.name
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="email"
//                     value={updatedStudent.email}
//                     onChange={(e) =>
//                       setUpdatedStudent({
//                         ...updatedStudent,
//                         email: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   student.email
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     value={updatedStudent.age}
//                     onChange={(e) =>
//                       setUpdatedStudent({
//                         ...updatedStudent,
//                         age: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   student.age
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="date"
//                     value={updatedStudent.dob}
//                     onChange={(e) =>
//                       setUpdatedStudent({
//                         ...updatedStudent,
//                         dob: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   student.dob
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <button
//                     className="saveButton"
//                     onClick={() => handleSaveClick()}
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     className="editButton"
//                     onClick={() => handleUpdateClick(index, student)}
//                   >
//                     Edit
//                   </button>
//                 )}
//               </td>
//               <td>
//                 <button
//                   className="deleteButton"
//                   onClick={() => deleteStudent(student.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentList;
