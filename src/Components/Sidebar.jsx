import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
import { ImCross } from "react-icons/im";

import getServerInitials from "../utils/getServerInitials.js";

const Sidebar = ({ setUser, user }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [toggleProfileBox, setToggleProfileBox] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [status, setStatus] = useState(user?.status);

  const [copied, setCopied] = useState(false);

  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");

  const [serverPopup, setServerPopup] = useState(false);
  const [createServerPopup, setCreateServerPopup] = useState(false);
  const [joinServerPopup, setJoinServerPopup] = useState(false);

  const [serverName, setServerName] = useState("");

  const [inviteCode, setInviteCode] = useState("");

  const navigate = useNavigate();

  const loadServers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/checkAuth",
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setStatus(user?.status);
  }, [user]);

  const handleChangeStatus = async (newStatus) => {
    try {
      await axios.patch(
        "http://localhost:8000/user/change-status",
        { status: newStatus },
        { withCredentials: true },
      );

      setStatus(newStatus);
      setUser((prev) => ({
        ...prev,
        status: newStatus,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const profileRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setToggleProfileBox(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const statusRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setShowStatusMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const serverPopUpRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (
        serverPopUpRef.current &&
        !serverPopUpRef.current.contains(e.target)
      ) {
        setServerPopup(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleCreateServer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/server/create-server",
        { name: serverName.trim() },
        { withCredentials: true },
      );

      if (response.data.success) {
        await loadServers();
        setCreateServerPopup(false);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data.message);
      setErrorType("server");

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleJoinServer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/server/join-server",
        { inviteCode: inviteCode.trim() },
        { withCredentials: true },
      );

      if (response.data.success) {
        await loadServers();
        setJoinServerPopup(false);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data.message);
      setErrorType("serverJoin");

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
    }
  };

  return (
    <div className="flex ">
      <div className="bg-side-bar w-[70px] h-screen fixed top-0 left-0 flex flex-col items-center py-6 gap-6 z-50">
        <div
          className=" bg-[#43B581] flex items-center justify-center p-2 rounded-2xl cursor-pointer group relative"
          onClick={() => navigate("/")}
        >
          <img className="w-6" src="/white_logo.png" alt="logo" />

          <div className=" pointer-events-none absolute top-1 left-12  z-[999] border border-gray-700 bg-black text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap ">
            Direct message
          </div>
        </div>

        <div className="w-12 h-[1px] bg-[#232424]"></div>

        <div className="flex flex-col gap-4 mt-[1px]">
          {user?.servers?.map((s) => (
            <div
              className="bg-[#007453] p-2 rounded-2xl cursor-pointer group relative flex items-center justify-center"
              key={s._id}
              onClick={() => {
                navigate(`/server/${s._id}`);
              }}
            >
              <div className="text-white w-6 flex items-center justify-center text-center">
                {getServerInitials(s.name)}
              </div>
              <div className="pointer-events-none absolute top-1 left-12  z-[999] border border-gray-700 bg-black text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                {s.name}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-[1px]">
          <div
            className="bg-[#43B581] p-2 rounded-2xl cursor-pointer group relative"
            onClick={() => {
              setServerPopup(true);
            }}
          >
            <FiPlus size={24} color="white" />
            <div className="pointer-events-none absolute top-1 left-12  z-[999] border border-gray-700 bg-black text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
              Add a server
            </div>
          </div>

          <div className="bg-[#43B581] p-2 rounded-2xl cursor-pointer group relative">
            <MdOutlineSearch size={24} color="white" />
            <div className="pointer-events-none absolute top-1 left-12  z-[999] border border-gray-700 bg-black text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
              Discover servers
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {serverPopup && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="bg-[#103f38] p-5 rounded-2xl flex flex-col text-white w-[30%] gap-5 h-46 items-center justify-center"
                ref={serverPopUpRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-full flex items-end">
                  {" "}
                  <ImCross
                    onClick={() => {
                      setServerPopup(false);
                    }}
                    className="cursor-pointer"
                  />
                </div>
                <button
                  className="w-full bg-emerald-600 h-10 rounded-2xl cursor-pointer"
                  onClick={() => {
                    setServerPopup(false);
                    setCreateServerPopup(true);
                  }}
                >
                  Create a server
                </button>
                <button
                  className="w-full bg-emerald-600 h-10 rounded-2xl cursor-pointer"
                  onClick={() => {
                    setServerPopup(false);
                    setJoinServerPopup(true);
                  }}
                >
                  Join a server
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {createServerPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-[#103f38] p-5 rounded-2xl flex flex-col text-white w-[30%] justify-center text-center "
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-2xl font-semibold mb-4">
                Creare your own server
              </h1>

              <div className="text-start flex flex-col gap-1">
                <label className="">
                  Server name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full bg-gray-300 h-10 rounded-lg px-2 text-black ${
                    error && errorType === "server" ? "border-red-500" : ""
                  }`}
                  onChange={(e) => {
                    setServerName(e.target.value);
                  }}
                />

                {error && errorType === "server" ? (
                  <>
                    <p className="text-red-500 font-semibold mt-3">{error}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="flex justify-between mt-3">
                <button
                  className="bg-emerald-500 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
                  onClick={() => {
                    setCreateServerPopup(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-emerald-500 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
                  onClick={handleCreateServer}
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {joinServerPopup ? (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="bg-[#103f38] p-5 rounded-2xl flex flex-col text-white w-[30%] justify-center text-center "
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-2xl font-semibold mb-4">Join a server</h1>

                <div className="text-start flex flex-col gap-1">
                  <label className="">
                    Invite code <span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={(e) => setInviteCode(e.target.value)}
                    value={inviteCode}
                    className={`w-full bg-gray-300 h-10 rounded-lg px-2 text-black ${
                      error && errorType === "serverJoin"
                        ? "border-red-500 border"
                        : ""
                    }`}
                  />

                  {error && errorType === "serverJoin" ? (
                    <>
                      <p className="text-red-500 font-semibold mt-3">{error}</p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex justify-between mt-3">
                  <button
                    className="bg-emerald-500 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
                    onClick={() => {
                      setJoinServerPopup(false);
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="bg-emerald-500 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
                    onClick={() => handleJoinServer()}
                  >
                    Join
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

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
              src="/white_logo.png"
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
          <Link to="/settings">
            <IoSettingsSharp
              size={20}
              color="white"
              className="mr-3 cursor-pointer hover:rotate-180 transition-transform duration-500 ease-in-out"
            />
          </Link>

          <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 border border-gray-700 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
            Settings
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toggleProfileBox ? (
          <>
            <motion.div
              className="absolute bottom-20 left-4 z-[999] w-72 rounded-2xl bg-[#103f38] border border-[#2d2d2d] shadow-xl overflow-hidden"
              ref={profileRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="h-16 bg-[#007453]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />

              <div className="px-4 pb-4 -mt-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl border-4 border-[#103f38] overflow-hidden bg-black">
                  <img
                    className="w-full h-full object-cover"
                    src="/white_logo.png"
                    alt="avatar"
                  />
                </div>

                <h1 className="text-white text-lg font-semibold mt-2">
                  {user?.displayName}
                </h1>

                <p className="text-gray-400 text-sm cursor-pointer">
                  @{user?.username}
                </p>
              </div>

              <motion.div className="px-3 pb-4 flex flex-col gap-2">
                <Link
                  to="/settings"
                  className="w-full bg-[#1a4f44] hover:bg-[#007453] transition-all text-white py-2 rounded-xl text-sm cursor-pointer flex justify-center items-center gap-2"
                >
                  <MdEdit />
                  Edit Profile
                </Link>

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

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(user.username);
                    setCopied(true);

                    setTimeout(() => {
                      setCopied(false);
                    }, 3000);
                  }}
                  className="w-full bg-[#1a4f44] hover:bg-[#007453] transition-all text-white py-2 rounded-xl text-sm cursor-pointer flex justify-center items-center gap-2"
                >
                  <FaRegUserCircle />
                  {copied ? "Copied" : "Copy Username"}
                </button>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showStatusMenu ? (
          <motion.div
            className="absolute bg-[#103f38] left-78  bottom-20 text-white p-3 rounded-2xl flex flex-col w-60 gap-2 z-[999]"
            ref={statusRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="flex items-center gap-2 cursor-pointer hover:bg-[#116852] py-1 px-2 rounded-xl  transition-all"
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
              className="flex items-center gap-2 cursor-pointer hover:bg-[#116852] py-1 px-2 rounded-xl  transition-all"
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
              className="flex items-center gap-2 cursor-pointer hover:bg-[#116852] py-1 px-2 rounded-2xl  transition-all"
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
              className="flex items-center gap-2 cursor-pointer hover:bg-[#116852] py-1 px-2 rounded-2xl  transition-all"
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
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* <div className="bg-side-bar w-[280px] h-screen ml-[70px] fixed left-0 top-0 flex flex-col justify-between z-40">
        <div className="w-[1px] bg-[#424644] min-h-screen"></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
