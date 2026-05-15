import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";
import DirectMessageSidebar from "../../Components/DirectMessageSidebar";
import FriendsPage from "../../Components/FriendsPage";
import FriendReq from "../../Components/FriendReq";

import { useState } from "react";

const DirectMessagePage = () => {
  const [mainTab, setMainTab] = useState("friends");

  const renderContent = () => {
    if (mainTab === "friends")
      return <FriendsPage mainTab={mainTab} setMainTab={setMainTab} />;

    if (mainTab === "friendreqs") return <FriendReq />;

    if (mainTab.startsWith("friend/")) {
      const friendId = mainTab.split("/")[1];
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <DirectMessageSidebar mainTab={mainTab} setMainTab={setMainTab} />
      {renderContent()}
    </div>
  );
};

export default DirectMessagePage;
