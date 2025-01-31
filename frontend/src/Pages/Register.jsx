// src/Pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { registerUser } from "../Axios/AxiosInstance"; // Import registerUser function
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCnfPassword] = useState("");
  const [role, setRole] = useState("agent"); // Default role is "agent"
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if(password !== confirmPassword) {
        return console.error("Password and Confirm Password do not match");
      }
      
      const response = await axios.post("http://localhost:3000/auth/register",{ name, email, password, confirmPassword, role });

      localStorage.setItem("token", response.data.token);
      // localStorage.setItem("role", response.data.role);

      // if (response.data.role === "admin") {
      //   navigate("/users");
      // } else {
        navigate("/dashboard");
      // }
    } catch (error) {
      console.error("Registration Failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-3 p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setCnfPassword(e.target.value)}
          required
        />
        <select
          className="w-full mb-3 p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
