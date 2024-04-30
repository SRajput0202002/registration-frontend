import React, { useState, useEffect } from "react";
import "./Register1.css";

const Register = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateStudent = async (studentId, updatedStudentData) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/students/${studentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStudentData),
        }
      );

      if (response.ok) {
        console.log("Data updated successfully");
        fetchData();
      } else {
        console.error("Unable to update data");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/students/${studentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Data deleted successfully");
        fetchData();
      } else {
        console.error("Unable to delete data");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const saveStudentData = (studentId, index) => {
    const updatedStudentData = {
      name: document.getElementById(`name-${index}`).value,
      email: document.getElementById(`email-${index}`).value,
      age: document.getElementById(`age-${index}`).value,
      dob: document.getElementById(`dob-${index}`).value,
    };
    updateStudent(studentId, updatedStudentData);
  };

  const handleDelete = (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      deleteStudent(studentId);
    }
  };

  const handleEdit = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].isEditing = true;
    setStudents(updatedStudents);
  };

  const handleCancelEdit = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].isEditing = false;
    setStudents(updatedStudents);
  };

  return (
    <div className="container">
      {/* <h1>STUDENT REGISTRATION FORM</h1> */}
      <div className="studentList">
        <h2>Student List</h2>
        <table>
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
                <td>
                  {student.isEditing ? (
                    <input
                      className="input"
                      type="text"
                      id={`name-${index}`}
                      defaultValue={student.name}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {student.isEditing ? (
                    <input
                      className="input"
                      type="email"
                      id={`email-${index}`}
                      defaultValue={student.email}
                    />
                  ) : (
                    student.email
                  )}
                </td>
                <td>
                  {student.isEditing ? (
                    <input
                      className="input"
                      type="number"
                      id={`age-${index}`}
                      defaultValue={student.age}
                    />
                  ) : (
                    student.age
                  )}
                </td>
                <td>
                  {student.isEditing ? (
                    <input
                      className="input"
                      type="date"
                      id={`dob-${index}`}
                      defaultValue={student.dob.split("T")[0]}
                    />
                  ) : (
                    student.dob.split("T")[0]
                  )}
                </td>
                <td>
                  {student.isEditing ? (
                    <>
                      <button
                        className="saveButton"
                        onClick={() => saveStudentData(student.id, index)}
                      >
                        Save
                      </button>
                      <button
                        className="cancelButton"
                        onClick={() => handleCancelEdit(index)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="editButton"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Register;
