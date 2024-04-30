import React from "react";
import Register from "./data/Register.js";
import List from "./data/List.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    // <>
    //   <Register />
      
    // </>
    <div>
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/List" element={<List />} />
       
      </Routes>
     
    </BrowserRouter>
  </div>
  );
}

export default App;
