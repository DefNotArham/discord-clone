import React, { useState, useRef, useEffect } from "react";

import { RiUserAddFill } from "react-icons/ri";
import { SiHashicorp } from "react-icons/si";
import { FaChevronDown } from "react-icons/fa";

const ServerSideBar = ({ server, setInviteToServerPopUp }) => {
  const [serverSetting, setServerSetting] = useState(false);

  const serverSettingsRef = useRef(null);

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

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#007453] transition cursor-pointer">
            Server Settings
          </button>

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#007453] transition cursor-pointer"
            onClick={() => {
              setInviteToServerPopUp(true);
            }}
          >
            Invite frineds
          </button>

          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer">
            Leave Server
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-10 px-2">
        {server?.channels?.map((c) => (
          <div
            key={server?._id}
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
