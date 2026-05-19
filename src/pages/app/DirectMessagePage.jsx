import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../Components/general/Sidebar";
import DirectMessageSidebar from "../../Components/friend/DirectMessageSidebar";
import FriendsPage from "../../Components/friend/FriendsPage";
import FriendReq from "../../Components/friend/FriendReq";
import PrivateMessage from "../../Components/friend/PrivateMessage";

import { useState } from "react";

const DirectMessagePage = () => {
  const [mainTab, setMainTab] = useState("friends");

  const navigate = useNavigate();
  const { friendId } = useParams();

  const renderContent = () => {
    if (friendId) return <PrivateMessage friendId={friendId} />;
    if (mainTab === "friendreqs") return <FriendReq />;

    return <FriendsPage mainTab={mainTab} setMainTab={setMainTab} />;
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
