import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import API from "../Axios/AxiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });
     
      Cookie.set("token", response.data.data.token, { expires: 5 / 1440 });
      Cookie.set("role", response.data.data.role, { expires: 5 / 1440 });

      if (response.data.data.role === "admin") {
        navigate("/users");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login Failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md space-y-4"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center">Sign in to your account</p>

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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          Not a member?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register Here!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
