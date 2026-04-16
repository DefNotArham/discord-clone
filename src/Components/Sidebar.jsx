import React from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDoNotDisturbOn } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";

const Sidebar = ({ user }) => {
  return (
    <div className="flex ">
      <div className="bg-side-bar w-[70px] h-screen fixed top-0 left-0 flex flex-col items-center py-6 gap-6 z-50">
        <div className=" bg-[#43B581] flex items-center justify-center p-2 rounded-2xl cursor-pointer group relative">
          <img className="w-6" src="/white_logo.png" alt="logo" />

          <div className="absolute top-1 left-12  z-[999] border border-gray-700 bg-black text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
            Direct message
          </div>
        </div>

        <div className="w-12 h-[1px] bg-[#424644]"></div>

        <div className="flex flex-col gap-4 mt-[1px]">
          <div className="bg-[#43B581] p-2 rounded-2xl cursor-pointer group relative">
            <FiPlus size={24} color="white" />
            <div className="absolute top-1 left-12  z-[999] border border-gray-700 bg-black text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
              Create server
            </div>
          </div>

          <div className="bg-[#43B581] p-2 rounded-2xl cursor-pointer group relative">
            <MdOutlineSearch size={24} color="white" />
            <div className="absolute top-1 left-12  z-[999] border border-gray-700 bg-black text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
              Discover servers
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#103f38] w-84 h-[60px] flex items-center absolute bottom-3 z-[999] left-2 rounded-2xl px-1 justify-between">
        <div className="flex gap-3 items-center hover:bg-[#007453] cursor-pointer rounded-xl px-3 py-1 transition-all w-50">
          <div className="w-6 rounded-2xl relative">
            <img src="./white_logo.png" alt="" />
            {user.status === "Online" ? (
              <FaCircle
                color="green"
                size={10}
                className="absolute bottom-[-1px] right-[-3px]"
              />
            ) : user.status === "DND" ? (
              <MdDoNotDisturbOn
                color="red"
                size={13}
                className="absolute bottom-[-3px] right-[-5px]"
              />
            ) : user.status === "Idle" ? (
              <FaMoon
                color="yellow"
                size={10}
                className="absolute bottom-[-1px] right-[-3px] "
              />
            ) : null}
          </div>

          <div className="">
            <h1 className="text-white">{user.displayName}</h1>
            <p className="text-xs text-gray-400">{user.status}</p>
          </div>
        </div>

        <div className="relative group">
          <IoSettingsSharp
            size={20}
            color="white"
            className="mr-3 cursor-pointer hover:rotate-180 transition-transform duration-500 ease-in-out"
          />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 border border-gray-700 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
            Settings
          </div>
        </div>
      </div>

      <div className="bg-side-bar w-[280px] h-screen ml-[70px] fixed left-0 top-0 flex flex-col justify-between z-40">
        <div className="w-[1px] bg-[#424644] min-h-screen"></div>
      </div>
    </div>
  );
};

export default Sidebar;
