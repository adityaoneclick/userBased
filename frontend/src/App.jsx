import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Pages/Dashboard"; // Add these components
import Users from "./Pages/Users"; // Add these components
import HomePage from "./Pages/HomePage"; // Home page after login
import { RefreshHandler } from "./Utils/RefreshHandler";
import { useState } from "react";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Link to='/login' />;
  };

  return (
    
    <Router>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<PrivateRoute element={<HomePage/>} /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
