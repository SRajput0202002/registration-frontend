import React, { useState } from "react";
import "./Register1.css"

const updateStudents = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [updateInput, setUpdateInput] = useState("");

  const handleUpdateClick = (index) => {
    setEditIndex(index);
    setUpdateInput(list[index]);
  };

  const handleSaveClick = () => {
    if (editIndex !== null && updateInput !== "") {
      const updatedList = [...list];
      updatedList.splice(editIndex, 1, updateInput);
      setList(updatedList);
      setEditIndex(null);
      setUpdateInput("");
    }
  };

  return (
    <div>
      <button className="editButton">Edit</button>
    </div>
  );
};

export default updateStudents;
