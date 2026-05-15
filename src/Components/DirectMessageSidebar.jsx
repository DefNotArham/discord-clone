import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { RiChatUnreadFill } from "react-icons/ri";

const DirectMessageSidebar = ({ mainTab, setMainTab }) => {
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
      </div>
    </div>
  );
};

export default DirectMessageSidebar;
