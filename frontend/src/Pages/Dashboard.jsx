import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

export default function Dashboard({roles}){
    const navigate = useNavigate();
      const handleLogOut = () => {
        Cookies.remove("token");
        Cookies.remove("role");
        navigate("/login");
      };
    if(roles?.includes(Cookies.get('role'))){
        return(
            <div>
                <h1 className="text-2xl font-semibold text-gray-700 text-center">Dashboard</h1>
                <button
          onClick={handleLogOut}
          className="mt-6 w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition shadow-md"
        >
          Log Out
        </button>
            </div>
        )
    }
    return(
        <div>
            <h1 className="text-2xl font-semibold text-gray-700 text-center">You are not authorized to view this page</h1>
        </div>
    )
}
