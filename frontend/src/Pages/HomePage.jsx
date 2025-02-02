import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to OneClick IT Consultancy</h1>
        <p className="text-gray-600 mb-6">Please log in or register to continue.</p>

        <div className="flex flex-col gap-4">
        <Link
            to="/login"
            className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
