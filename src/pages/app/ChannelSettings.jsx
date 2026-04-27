import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import DefaultBackground from "../../Components/DefaultBackground";

import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

const ChannelSettings = ({ setUser, user }) => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [deleteChannel, setDeleteChannel] = useState(false);

  const { serverId } = useParams();
  const { channelId } = useParams();

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");

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

  const handleDeleteChannel = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/server/channel/delete-channel/${serverId}/channel/${channelId}`,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        navigate(`/server/${serverId}`);
        loadServers();
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data.message);
      setErrorType("deletechannel");

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
    }
  };

  return (
    <DefaultBackground>
      <div className="flex h-screen text-discord-white w-full">
        <div className="w-[320px] bg-discord-deep border-r border-discord-divider p-4">
          <h2 className="text-sm text-discord-muted mb-4 uppercase tracking-wide">
            Channel Settings
          </h2>

          <div className="flex flex-col gap-2">
            <button
              className={`text-left px-3 py-2 rounded-md bg-discord-bg text-white text-sm cursor-pointer ${
                selectedTab === "overview" ? "bg-discord-btn-neutral" : ""
              }`}
              onClick={() => setSelectedTab("overview")}
            >
              Overview
            </button>
            <button
              className={`text-left px-3 py-2 rounded-md bg-discord-bg text-white text-sm cursor-pointer ${
                selectedTab === "permission" ? "bg-discord-btn-neutral" : ""
              }`}
              onClick={() => setSelectedTab("permission")}
            >
              Permissions
            </button>

            <button
              className="text-left px-3 py-2 rounded-md bg-discord-danger text-white mt-2 text-sm cursor-pointer flex items-center justify-between"
              onClick={() => setDeleteChannel(true)}
            >
              Delete Channel <MdDeleteForever size={16} />
            </button>
          </div>
        </div>

        <div className=" bg-discord-sidebar w-full flex flex-col pl-30 pt-5">
          {selectedTab === "overview" ? (
            <div className="mb-8 max-w-[500px]">
              <label className="block text-xs text-discord-muted mb-2 uppercase tracking-wide">
                Channel Name
              </label>

              <input
                type="text"
                placeholder="Enter channel name"
                className="w-full bg-discord-input text-white px-3 py-2 rounded-md outline-none border border-transparent focus:border-discord-blurple"
              />
            </div>
          ) : null}
        </div>
      </div>
      <AnimatePresence>
        {deleteChannel ? (
          <motion.div
            className="inset-0 fixed bg-black/50 flex items-center justify-center z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-discord-deep p-6 rounded-lg w-[400px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-2 text-discord-danger">
                Delete Channel
              </h2>
              <p className="text-sm text-discord-muted mb-6">
                Are you sure? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteChannel(false)}
                  className="px-4 py-2 rounded-md bg-discord-btn-neutral hover:bg-discord-btn-neutral-hover text-sm cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    handleDeleteChannel();
                  }}
                  className="px-4 py-2 rounded-md bg-discord-danger hover:bg-discord-danger-hover text-sm cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DefaultBackground>
  );
};

export default ChannelSettings;
