import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Icons
import { FiPlus } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDoNotDisturbOn } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const Sidebar = ({ user }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [toggleProfileBox, setToggleProfileBox] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [status, setStatus] = useState(user.status);

  const profileRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    setStatus(user.status);
  }, [user]);

  const handleChangeStatus = async (newStatus) => {
    try {
      await axios.post(
        "http://localhost:8000/user/change-status",
        { status: newStatus },
        { withCredentials: true },
      );

      setStatus(newStatus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let handler = (e) => {
      if (!profileRef.current.contains(e.target)) {
        setToggleProfileBox(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    let handler = (e) => {
      if (!statusRef.current.contains(e.target)) {
        setShowStatusMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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

      <div
        className="bg-[#103f38] w-84 h-[60px] flex items-center absolute bottom-3 z-[999] left-2 rounded-2xl px-1 justify-between"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="flex gap-3 items-center hover:bg-[#007453] cursor-pointer rounded-xl px-3 py-1 transition-all w-50"
          onClick={() => setToggleProfileBox(!toggleProfileBox)}
        >
          <div className="w-6 rounded-2xl relative">
            <img
              src="./white_logo.png"
              alt=""
              className="w-full h-full object-cover"
            />
            {status === "Online" ? (
              <FaCircle
                color="green"
                size={10}
                className="absolute bottom-[-1px] right-[-3px]"
              />
            ) : status === "Do Not Disturb" ? (
              <MdDoNotDisturbOn
                color="red"
                size={13}
                className="absolute bottom-[-3px] right-[-5px]"
              />
            ) : status === "Idle" ? (
              <FaMoon
                color="yellow"
                size={10}
                className="absolute bottom-[-1px] right-[-3px] "
              />
            ) : status === "Invisible" ? (
              <FaCircle
                color="gray"
                size={10}
                className="absolute bottom-[-1px] right-[-3px] "
              />
            ) : status === "Offline" ? (
              <FaCircle
                color="gray"
                size={10}
                className="absolute bottom-[-1px] right-[-3px] "
              />
            ) : null}
          </div>

          <div className="">
            <h1 className="text-white">{user.displayName}</h1>
            <p className="text-xs text-gray-400 relative h-4 w-23">
              <span
                className={`absolute transition-opacity duration-300 ${
                  isHovering ? "opacity-0" : "opacity-100"
                }`}
              >
                {status}
              </span>

              <span
                className={`absolute transition-opacity duration-300 ${
                  isHovering ? "opacity-100" : "opacity-0"
                }`}
              >
                {user.username}
              </span>
            </p>
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

      {toggleProfileBox ? (
        <>
          <div
            className="absolute bottom-20 left-4 z-[999] w-72 rounded-2xl bg-[#103f38] border border-[#2d2d2d] shadow-xl overflow-hidden"
            ref={profileRef}
          >
            <div className="h-16 bg-[#007453]" />

            <div className="px-4 pb-4 -mt-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl border-4 border-[#103f38] overflow-hidden bg-black">
                <img
                  className="w-full h-full object-cover"
                  src="/white_logo.png"
                  alt="avatar"
                />
              </div>

              <h1 className="text-white text-lg font-semibold mt-2">
                {user.displayName}
              </h1>

              <p className="text-gray-400 text-sm cursor-pointer">
                @{user.username}
              </p>
            </div>

            <div className="px-3 pb-4 flex flex-col gap-2">
              <button className="w-full bg-[#1a4f44] hover:bg-[#007453] transition-all text-white py-2 rounded-xl text-sm cursor-pointer flex justify-center items-center gap-2">
                <MdEdit />
                Edit Profile
              </button>

              <div className="relative">
                <button
                  className="w-full bg-[#1a4f44] hover:bg-[#007453] transition-all text-white py-2 rounded-xl text-sm cursor-pointer flex items-center gap-2 justify-center px-5"
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                >
                  {status === "Online" ? (
                    <FaCircle color="green" size={10} className=" " />
                  ) : status === "Idle" ? (
                    <FaMoon color="yellow" size={10} className=" " />
                  ) : status === "Invisible" ? (
                    <FaCircle color="gray" size={10} className=" " />
                  ) : status === "Offline" ? (
                    <FaCircle color="gray" size={10} className=" " />
                  ) : status === "Do Not Disturb" ? (
                    <MdDoNotDisturbOn color="red" size={10} className=" " />
                  ) : null}{" "}
                  {status} <FaAngleDoubleRight />
                </button>
              </div>

              <button className="w-full bg-[#1a4f44] hover:bg-[#007453] transition-all text-white py-2 rounded-xl text-sm cursor-pointer flex justify-center items-center gap-2">
                <FaRegUserCircle />
                Copy User Id
              </button>
            </div>
          </div>
        </>
      ) : null}

      {showStatusMenu ? (
        <div
          className="absolute bg-[#103f38] left-78  bottom-20 text-white p-3 rounded-2xl flex flex-col w-60 gap-5 z-[999]"
          ref={statusRef}
        >
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              const newStatus = "Online";
              setStatus(newStatus);
              handleChangeStatus(newStatus);
              setShowStatusMenu(false);
            }}
          >
            <FaCircle color="green" size={10} className=" " /> Online
          </button>
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              const newStatus = "Idle";
              setStatus(newStatus);
              handleChangeStatus(newStatus);
              setShowStatusMenu(false);
            }}
          >
            <FaMoon color="yellow" size={10} className=" " />
            Idle
          </button>
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              const newStatus = "Do Not Disturb";
              setStatus(newStatus);
              handleChangeStatus(newStatus);
              setShowStatusMenu(false);
            }}
          >
            <MdDoNotDisturbOn color="red" size={10} className=" " />
            Do Not Disturb
          </button>
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              const newStatus = "Invisible";
              setStatus(newStatus);
              handleChangeStatus(newStatus);
              setShowStatusMenu(false);
            }}
          >
            <FaCircle color="gray" size={10} className=" " />
            Invisible
          </button>
        </div>
      ) : null}

      <div className="bg-side-bar w-[280px] h-screen ml-[70px] fixed left-0 top-0 flex flex-col justify-between z-40">
        <div className="w-[1px] bg-[#424644] min-h-screen"></div>
      </div>
    </div>
  );
};

export default Sidebar;
