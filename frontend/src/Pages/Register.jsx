import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCnfPassword] = useState("");
  const [role, setRole] = useState("agent");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return console.error("Password and Confirm Password do not match");
      }

      const response = await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        password,
        confirmPassword,
        role,
      });

      navigate("/login");
    } catch (error) {
      console.error(
        "Registration Failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md space-y-4"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Create an Account
        </h2>
        <p className="text-gray-500 text-center">Join us today!</p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={confirmPassword}
          onChange={(e) => setCnfPassword(e.target.value)}
          required
        />

        <select
          className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-600">
          Already a member?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
