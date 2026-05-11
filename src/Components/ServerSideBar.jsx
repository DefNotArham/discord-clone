import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { RiUserAddFill } from "react-icons/ri";
import { SiHashicorp } from "react-icons/si";
import { FaChevronDown } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { IoIosExit } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
import useAuthStore from "../Stores/Auth.Store";
import useServerStore from "../Stores/Server.Store";
import useChannelStore from "../Stores/Channel.Store";

const ServerSideBar = ({
  setInviteToServerPopUp,
  setLeaveConfirmPopup,
  setChannelPopup,
}) => {
  const { user } = useAuthStore();
  const { currentServer } = useServerStore();

  const { loadChannels, channels } = useChannelStore();

  const [serverSetting, setServerSetting] = useState(false);

  const serverSettingsRef = useRef(null);

  const { serverId } = useParams();
  const { channelId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (serverId) {
      loadChannels(serverId);
    }
  }, [serverId]);

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
    <div className="bg-[#2b2d31] w-[200px] md:w-[280px]  h-screen ml-[70px] fixed left-0 top-0 flex flex-col z-40">
      <div className="h-12 flex items-center text-white font-semibold border-b border-[#1e1f22] justify-between px-5 text-sm">
        <div
          className="flex items-center gap-2 cursor-pointer "
          onClick={() => {
            setServerSetting(!serverSetting);
          }}
        >
          <h1 className="text-white truncate max-w-[180px]">
            {" "}
            {currentServer?.name ?? "Loading..."}
          </h1>
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

      <AnimatePresence>
        {serverSetting && (
          <motion.div
            className="bg-[#111214] w-[260px] fixed top-12 rounded-xl shadow-lg border border-[#1e1f22] z-[1000] p-2 text-white text-sm"
            ref={serverSettingsRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {currentServer?.owner?.toString() === user?._id ? (
              <>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#5865f2] transition cursor-pointer flex items-center justify-between gap-3 group"
                  onClick={() => {
                    navigate(`/server/${serverId}/settings`);
                  }}
                >
                  Server settings
                  <IoSettingsSharp
                    size={15}
                    color="white"
                    className="mr-3 cursor-pointer group-hover:rotate-180 transition-transform duration-500 ease-in-out"
                  />
                </button>

                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#5865f2] transition cursor-pointer flex items-center justify-between gap-3 group"
                  onClick={() => {
                    setChannelPopup(true);
                  }}
                >
                  Create channel
                  <IoCreate
                    size={15}
                    color="white"
                    className="mr-3 cursor-pointer group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-200 ease-in-out"
                  />
                </button>
              </>
            ) : null}

            <button
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#5865f2] transition cursor-pointer flex items-center justify-between gap-3 group"
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
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#ed4245] transition cursor-pointer flex items-center justify-between gap-3 group"
            >
              Leave Server
              <IoIosExit
                className="mr-3 cursor-pointer group-hover:-translate-x-1 transition-transform duration-500 ease-in-out"
                size={15}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-y-auto h-[85%]">
        <div className="flex flex-col gap-3 mt-10 px-2">
          {channels?.map((c) => (
            <div
              key={c?._id}
              onClick={() => {
                navigate(`/server/${currentServer?._id}/channel/${c?._id}`);
              }}
              className={`text-[#b5bac1] bg-[#3c3f44] hover:text-white transition-all flex items-center gap-2 px-3 rounded-lg h-9 text-sm cursor-pointer w-full ${c?._id.toString() === channelId?.toString() ? "bg-discord-border" : ""} `}
            >
              <p
                // onClick={() => {
                //   navigate(`/server/${currentServer?._id}/channel/${c?._id}`);
                // }}
                className="truncate flex-1"
              >
                #{c?.name}
              </p>
              {currentServer?.owner?.toString() === user?._id ? (
                <IoSettingsSharp
                  className="shrink-0"
                  size={16}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/server/${currentServer?._id}/channel/${c?._id}/settings`,
                    );
                  }}
                />
              ) : (
                <RiUserAddFill
                  className="cursor-pointer"
                  size={16}
                  onClick={(e) => {
                    e.stopPropagation();
                    setInviteToServerPopUp(true);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerSideBar;
