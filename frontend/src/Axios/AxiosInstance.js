import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "http://localhost:3000", // Change this to your API URL
});

var cookies = Cookies.withConverter({
                  read: function (value) {
                    return value.replace(/%20/g, ' '); // Convert '%20' back to space
                  }
                });

// Request Interceptor - Add Token to Headers
API.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");    
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Global Errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || "Something went wrong!";
    
    // Show error toast
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

    // Redirect to login if Unauthorized (401)
    if (error.response?.status === 401) {
      Cookies.remove("token"); // Remove token
      window.location.href = "/login"; // Redirect to login
    }

    return Promise.reject(error);
  }
);

export default API;

