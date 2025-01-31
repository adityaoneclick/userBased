import axios from 'axios';

export default function Dashboard () {

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const header = {
              Authorization: localStorage.getItem("token"),
            };
            const response = await axios.get("http://localhost:3000/auth/3", { headers: header });

        } catch (error) {
          console.error("Registration Failed:", error.response?.data?.message || error.message);
        }
      }

    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}