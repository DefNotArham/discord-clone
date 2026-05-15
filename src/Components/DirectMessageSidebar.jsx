import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { RiChatUnreadFill } from "react-icons/ri";

import useFriendStore from "../Stores/Friend.Store";
import { useNavigate } from "react-router-dom";

const DirectMessageSidebar = ({ mainTab, setMainTab }) => {
  const { friends, loadFriends } = useFriendStore();

  useEffect(() => {
    const fetchData = async () => {
      await loadFriends();
    };

    fetchData();
  }, []);

  return (
    <div className="bg-discord-sidebar w-[200px] md:w-[280px] h-screen ml-[70px] fixed left-0 top-0 flex flex-col justify-between z-40 border-r border-gray-700 pt-2">
      <div className="flex flex-col gap-2 p-3">
        <div
          onClick={() => setMainTab("friends")}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white cursor-pointer transition-all ease-in-out ${mainTab === "friends" ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <FaUserFriends size={18} />
          Friends
        </div>

        <div
          onClick={() => setMainTab("friendreqs")}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700/60 cursor-pointer transition-all ease-in-out   ${mainTab === "friendreqs" ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <span className="w-[18px] h-[18px] flex items-center justify-center">
            <RiChatUnreadFill size={18} />
          </span>
          Friend Requests
        </div>

        <div>
          {friends.length === 0 && (
            <p className="text-discord-muted text-xs px-3 mt-2">
              No friends yet
            </p>
          )}

          {friends?.map((friend) => (
            <div
              key={friend._id}
              onClick={() => {
                setMainTab(`friend/${friend._id}`);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer group transition-colors ease-in-out mt-3 ${
                mainTab === `friend/${friend._id}`
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center text-white text-xs font-bold">
                  {friend.displayName?.[0]?.toUpperCase() ?? "?"}
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-medium truncate">
                  {friend.displayName}
                </span>

                <span className="text-discord-muted text-xs truncate">
                  {friend.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DirectMessageSidebar;
