import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie"

export const RefreshHandler = ({setIsAuthenticated}) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        // const token =Cookie.get('token');
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(
                location.pathname === "/login" ||
                location.pathname === "/register"
            ) {
                console.log(Cookie.get('token'))
                navigate("/dashboard");
            }
        }
    },[location, navigate, setIsAuthenticated]);
}