import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Axios/AxiosInstance";
import Cookies from "js-cookie";

export default function Users({ roles }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await API.get(`auth/${id}`);
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setRole(response.data.data.role);
    } catch (error) {
      console.error("User not found:", error.response?.data?.message || error.message);
    }
  };

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/login");
  };

  if (roles?.includes(Cookies.get("role"))) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Search User by ID</h1>
          <form onSubmit={handleSearch} className="space-y-4">
            <input
              type="text"
              placeholder="Enter User ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Find
            </button>
          </form>

          {name && email && role && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-700">User Details</h2>
              <p className="text-gray-600"><strong>Name:</strong> {name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {email}</p>
              <p className="text-gray-600"><strong>Role:</strong> {role}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogOut}
          className="mt-6 w-full max-w-md bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition shadow-md"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-700 text-center">
        ❌ You are not authorized to view this page
      </h1>
    </div>
  );
}
