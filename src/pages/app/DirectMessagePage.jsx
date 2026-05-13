import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";
import DirectMessageSidebar from "../../Components/DirectMessageSidebar";
import FriendsPage from "../../Components/FriendsPage";

const DirectMessagePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <DirectMessageSidebar />
      <FriendsPage />
    </div>
  );
};

export default DirectMessagePage;
