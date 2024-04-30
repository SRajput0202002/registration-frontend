import React, { useState, useEffect } from "react";
import "./Register1.css";
// import List from "./"
// import List from "./List";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDOB] = useState("");
  const [students, setStudents] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  // Fetching data from API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/students");
      const data = await response.json();
      // Assuming each student object from the API has an 'id' field
      setStudents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, age, dob };
      let url = "http://localhost:4000/api/v1/students";
      let method = "POST"; // Default to POST for creating new records

      if (isEdit) {
        // If in edit mode, change URL and method to update existing record
        url = `http://localhost:4000/api/v1/students/${currentStudentId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Refresh data after successful submission
        fetchData();
        console.log(
          isEdit ? "Data updated successfully" : "Data inserted successfully"
        );
        // Clear form fields
        setName("");
        setEmail("");
        setAge("");
        setDOB("");
        // Reset edit mode and current student ID
        setIsEdit(false);
        setCurrentStudentId(null);
      } else {
        console.error(
          isEdit ? "Failed to update data" : "Failed to insert data"
        );
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  //update
  const updateStudent = async () => {
    try {
      const updatedStudent = { name, email, age, dob };
      const response = await fetch(
        `http://localhost:4000/api/v1/students/${currentStudentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStudent),
        }
      );

      if (response.ok) {
        console.log("Data updated successfully");
        // Find the index of the student with the matching ID
        const index = students.findIndex(
          (student) => student.id === currentStudentId
        );
        if (index !== -1) {
          // Create a new array with the updated student at the same index
          const updatedStudents = [
            ...students.slice(0, index),
            { ...students[index], ...updatedStudent },
            ...students.slice(index + 1),
          ];
          setStudents(updatedStudents);
        }
        // Clear form fields
        setName("");
        setEmail("");
        setAge("");
        setDOB("");
        // Reset edit mode
        setIsEdit(false);
        setCurrentStudentId(null);
      } else {
        console.error("Unable to update data");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  // const deleteStudent = async (studentId) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/api/v1/students/${studentId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("Data deleted successfully");
  //       // Refresh data after successful deletion
  //       fetchData();
  //     } else {
  //       console.error("Unable to delete data");
  //     }
  //   } catch (err) {
  //     console.error("Error:", err.message);
  //   }
  // };

  //handling the edit button

  // const populateFormFields = (student) => {
  //   setName(student.name);
  //   setEmail(student.email);
  //   setAge(student.age);
  //   setDOB(student.dob);
  //   setIsEdit(true);
  //   setCurrentStudentId(student.id);
  // };

  //update feild

  return (
    <div className="container">
      <h1>STUDENT REGISTRATION FORM</h1>
      <form onSubmit={onSubmitForm}>
        <div className="mainDiv">
          <div className="subDiv">
            <input
            className="input"
              type="text"
              placeholder="enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
             className="input"
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
             className="input"
              type="age"
              placeholder="enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
             className="input"
              type="date"
              placeholder="enter your dob"
              value={dob ? dob.slice(0, 10) : ""}
              onChange={(e) => setDOB(e.target.value)}
            />
            <button
              className="btnStyle"
              type="button"
              onClick={isEdit ? updateStudent : onSubmitForm}
            >
              {isEdit ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
      <div className="studentList">
        {/* <h2>Student List</h2> */}
        {/* <table>
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
               
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.dob.split("T")[0]}</td>
                <td>
                  <button
                    className="editButton"
                    onClick={() => populateFormFields(student)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
       
      </div>
    </div>
  );
};

export default Register;
