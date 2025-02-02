import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import HomePage from "./Pages/HomePage";
import { RefreshHandler } from "./Utils/RefreshHandler";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Link to='/login' />;
  };

  return (
    <Router>
      <ToastContainer/>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* <Route path="/" element={<PrivateRoute element={<HomePage/>} /> } /> */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard roles={['agent','admin']} />}/> } />
        <Route path="/users" element={<PrivateRoute element={<Users roles={['admin']}/>} /> } />
      </Routes>
    </Router>
  );
}

export default App;
