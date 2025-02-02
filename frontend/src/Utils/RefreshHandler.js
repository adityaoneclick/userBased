import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const RefreshHandler = ({setIsAuthenticated}) => {
    const location = useLocation();
    const navigate = useNavigate();
    var cookies = Cookies.withConverter({
        read: function (value) {
          return value.replace(/%20/g, ' '); // Convert '%20' back to space
        }
      });

    useEffect(()=>{
        if(cookies.get('token')){
            setIsAuthenticated(true);
            if(
                location.pathname === "/login" ||
                location.pathname === "/register" ||
                location.pathname === "/"
            ) {
                navigate("/dashboard");
            }
        }
        else{
            setIsAuthenticated(false);
            if(
                location.pathname === "/dashboard" ||
                location.pathname === "/users"
            ) {
                navigate("/login");
            }
        }
    },[cookies, location, navigate, setIsAuthenticated]);
}