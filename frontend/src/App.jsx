// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Pages/Dashboard"; // Add these components
import Users from "./Pages/Users"; // Add these components
import HomePage from "./Pages/HomePage"; // Home page after login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
