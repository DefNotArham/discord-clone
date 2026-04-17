import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar";

const Homepage = ({ user, setUser, setIsAuthentication }) => {
  const userDOB = new Date(user?.DOB);
  const createdAt = new Date(user?.createdAt);

  return (
    <div className="flex">
      <Sidebar user={user} setUser={setUser} />
    </div>
  );
};

export default Homepage;
