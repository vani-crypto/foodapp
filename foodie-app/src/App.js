import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import "./App.css";

function App() {
  // Simulating real credentials stored securely
  const realUsers = [
    { fullName: "John Doe", email: "john@example.com", password: "John@123" },
    { fullName: "Jane Smith", email: "jane@example.com", password: "Jane@456" }
  ];

  const [users, setUsers] = useState(realUsers);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login users={users ?? []} setUsers={setUsers} />} />
          <Route path="/login" element={<Login users={users ?? []} setUsers={setUsers} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
