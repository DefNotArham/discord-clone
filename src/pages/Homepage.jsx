import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = ({ user, setUser, setIsAuthentication }) => {
  const userDOB = new Date(user?.DOB);
  const createdAt = new Date(user?.createdAt);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        setUser(null);
        setIsAuthentication(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-10">
      <h1>Email: {user?.email}</h1>
      <h1>Username: {user?.username}</h1>
      <h1>
        DOB:{" "}
        {`${userDOB.getFullYear()}-${String(userDOB.getMonth() + 1).padStart(2, "0")}-${String(userDOB.getDate()).padStart(2, "0")}`}
      </h1>
      <h1>
        CreatedAt:{" "}
        {`${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}-${String(createdAt.getDate()).padStart(2, "0")}`}
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-3 rounded-xl cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
};

export default Homepage;
