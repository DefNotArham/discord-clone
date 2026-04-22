import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { RiUserAddFill } from "react-icons/ri";
import { SiHashicorp } from "react-icons/si";
import { FaChevronDown } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { IoIosExit } from "react-icons/io";
import { IoCreate } from "react-icons/io5";

const ServerSideBar = ({
  server,
  setInviteToServerPopUp,
  setUser,
  setLeaveConfirmPopup,
  user,
}) => {
  const [serverSetting, setServerSetting] = useState(false);

  const serverSettingsRef = useRef(null);

  const { serverId } = useParams();

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
    let handler = (e) => {
      if (
        serverSettingsRef.current &&
        !serverSettingsRef.current.contains(e.target)
      ) {
        setServerSetting(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="bg-side-bar w-[280px] h-screen ml-[70px] fixed left-0 top-0 flex flex-col z-40">
      <div className="h-12 flex items-center px-1 text-white font-semibold border-b border-[#424644]  justify-between pr-5 text-sm">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setServerSetting(!serverSetting);
            console.log(serverSetting);
          }}
        >
          <h1> {server?.name ?? "Loading..."}</h1>
          <FaChevronDown className="" />
        </div>
        <RiUserAddFill
          className="cursor-pointer"
          size={19}
          onClick={() => {
            setInviteToServerPopUp(true);
          }}
        />
      </div>

      {serverSetting && (
        <div
          className="bg-[#103f38] w-[260px] fixed top-12 rounded-xl shadow-lg border border-[#2d2d2d] z-[1000] p-2 text-white text-sm"
          ref={serverSettingsRef}
        >
          {server.owner.toString() === user._id ? (
            <>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#007453] transition cursor-pointer flex items-center justify-between gap-3 group">
                Sever settings
                <IoSettingsSharp
                  size={15}
                  color="white"
                  className="mr-3 cursor-pointer group-hover:rotate-180 transition-transform duration-500 ease-in-out"
                />
              </button>

              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#007453] transition cursor-pointer flex items-center justify-between gap-3 group">
                Create channel
                <IoCreate
                  size={15}
                  color="white"
                  className="mr-3 cursor-pointer  group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-200 ease-in-out"
                />
              </button>
            </>
          ) : null}

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#007453] transition cursor-pointer flex items-center justify-between gap-3 group"
            onClick={() => {
              setInviteToServerPopUp(true);
            }}
          >
            Invite frineds
            <RiUserAddFill
              className="mr-3 cursor-pointer group-hover:-translate-y-1 transition-transform duration-500 ease-in-out"
              size={15}
            />
          </button>

          <button
            onClick={() => {
              setLeaveConfirmPopup(true);
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer flex items-center justify-between gap-3 group"
          >
            Leave Server
            <IoIosExit
              className="mr-3 cursor-pointer group-hover:-translate-x-1 transition-transform duration-500 ease-in-out"
              size={15}
            />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-10 px-2">
        {server?.channels?.map((c) => (
          <div
            key={c?._id}
            className="text-white flex items-center gap-2 bg-[#00ae80] justify-center px-10 rounded-lg h-9 text-sm cursor-pointer"
          >
            <SiHashicorp />
            <p>{c?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerSideBar;
