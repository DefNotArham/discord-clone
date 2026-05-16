import React, { useState } from "react";

import { FaUserFriends } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import useFriendStore from "../../Stores/Friend.Store";

const FriendsPage = ({ mainTab, setMainTab }) => {
  const [activeTab, setActiveTab] = useState("online");
  const [targetUsername, setTargetUsername] = useState("");

  const { addFriend, sentFriendRequests, friendError, errorType } =
    useFriendStore();

  const [showReqSuccess, setShowReqSuccess] = useState(false);

  const handleSendFriendReq = async (targetUsername) => {
    try {
      const result = await addFriend(targetUsername);

      if (result.success) {
        setShowReqSuccess(true);

        setTimeout(() => {
          setShowReqSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:ml-87 ml-67 py-4 text-white flex flex-col bg-discord-border w-screen h-screen items-start">
      <div className="flex gap-8 mx-7">
        <div className="flex items-center gap-2 cursor-default">
          <FaUserFriends size={20} />
          <span className="font-bold">Friends</span>
          <div className="w-[1%] h-4 bg-gray-500"></div>
        </div>

        <div className="flex items-center custom3:gap-10 gap-5  ">
          <button
            onClick={() => setActiveTab("online")}
            className={`cursor-pointer px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition-all ease-in-out  text-xs custom3:text-sm ${
              activeTab === "online" ? "bg-gray-700" : ""
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`cursor-pointer px-6 py-2 rounded-md font-semibold hover:bg-gray-700 transition-all ease-in-out text-xs custom3:text-sm ${
              activeTab === "all" ? "bg-gray-700" : ""
            }`}
          >
            All
          </button>

          <button
            onClick={() => setActiveTab("addfriend")}
            className={`cursor-pointer  px-3 py-2 rounded-md text-xs custom3:text-sm font-semibold  transition-all ease-in-out ${activeTab === "addfriend" ? "bg-discord-blurple/10 text-discord-blurple" : "bg-discord-blurple text-white hover:bg-[#454fb8]"}`}
          >
            Add Friend
          </button>
        </div>
      </div>
      <div className="w-[100%] h-[0.1%] bg-gray-600 mt-3  "></div>

      <div className="w-full px-8 py-6">
        {activeTab === "addfriend" && (
          <div className="bg-[#2b2d31] rounded-xl p-6 w-full max-w-3xl flex flex-col gap-4">
            <div>
              <h1 className="text-xl font-bold text-white">Add Friend</h1>
              <p className="text-gray-400 text-sm mt-1">
                You can add friends with their username.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter a Username"
                onChange={(e) => setTargetUsername(e.target.value)}
                value={targetUsername}
                className="flex-1 h-12 px-4 rounded-lg bg-[#1e1f22] border border-gray-700 outline-none text-sm focus:border-discord-blurple transition-all"
              />

              <button
                onClick={() => handleSendFriendReq(targetUsername)}
                className="h-12 px-5 rounded-lg bg-discord-blurple hover:bg-[#4e5dff] transition-all font-semibold text-sm cursor-pointer"
              >
                Send Friend Request
              </button>
            </div>

            {showReqSuccess && (
              <p className="text-discord-success text-sm font-medium ml-1 flex items-center gap-1">
                <FaCheckCircle /> Friend request sent successfully
              </p>
            )}

            {friendError && errorType === "addFriend" && (
              <p className="text-discord-danger text-sm font-medium ml-1 flex items-center gap-1">
                <MdError /> {friendError}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
