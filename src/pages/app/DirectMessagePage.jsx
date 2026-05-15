import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";
import DirectMessageSidebar from "../../Components/DirectMessageSidebar";
import FriendsPage from "../../Components/FriendsPage";
import FriendReq from "../../Components/FriendReq";

import { useState } from "react";

const DirectMessagePage = () => {
  const [mainTab, setMainTab] = useState("friends");

  return (
    <div className="flex">
      <Sidebar />
      <DirectMessageSidebar mainTab={mainTab} setMainTab={setMainTab} />
      {mainTab === "friends" ? (
        <FriendsPage mainTab={mainTab} setMainTab={setMainTab} />
      ) : (
        <FriendReq />
      )}
    </div>
  );
};

export default DirectMessagePage;
