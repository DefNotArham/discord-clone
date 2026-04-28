import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

import DefaultBackground from "../../Components/DefaultBackground";

import { MdDeleteForever } from "react-icons/md";
import { FaCircleXmark, FaSketch } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

const ChannelSettings = ({ setUser, user }) => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [deleteChannel, setDeleteChannel] = useState(false);

  const { serverId, channelId } = useParams();

  const [channel, setChannel] = useState(null);
  const [channelName, setChannelName] = useState(channel?.name);

  const [channelSidebar, setChannelSidebar] = useState(false);

  const [editChannelName, setEditChannelName] = useState(false);
  const [editChannelLoading, setEditChannelLoading] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");

  useEffect(() => {
    handleLoadChannel();
  }, []);

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

  const handleLoadChannel = async () => {
    setEditChannelLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/server/channel/load-channel/${serverId}/channel/${channelId}`,
        {
          withCredentials: true,
        },
      );

      if (response?.data.success) {
        setChannel(response.data.channel);
        setChannelName(response.data.channel.name);
        setEditChannelLoading(false);
      }
    } catch (error) {
      console.log(error);
      setEditChannelLoading(false);
    }
  };

  const handleEditChannelName = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/server/channel/edit-channelName/${serverId}/channel/${channelId}`,
        {
          newChannelName: channelName,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        loadServers();
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data.message);
      setErrorType("editChannel");

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleEditChannelnameKey = (e) => {
    if (e.key === "Enter") {
      handleEditChannelName();
    }
  };

  return (
    <DefaultBackground>
      <div className="flex h-screen text-discord-white w-full ">
        <div className="custom2:w-[400px] hidden custom2:block  bg-discord-deep border-r border-discord-divider p-4">
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

        <AnimatePresence>
          {channelSidebar && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-[999]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setChannelSidebar(false)}
              />

              <motion.div
                className="fixed top-0 left-0 h-full w-[260px] bg-discord-deep border-r border-discord-divider z-[1000] p-4"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm text-discord-muted uppercase tracking-wide">
                    Channel Settings
                  </h2>

                  <FaCircleXmark
                    size={20}
                    className="cursor-pointer text-discord-muted hover:text-white"
                    onClick={() => setChannelSidebar(false)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    className={`text-left px-3 py-2 rounded-md text-sm cursor-pointer ${
                      selectedTab === "overview"
                        ? "bg-discord-btn-neutral text-white"
                        : "text-discord-muted hover:text-white hover:bg-discord-bg"
                    }`}
                    onClick={() => {
                      setSelectedTab("overview");
                      setChannelSidebar(false);
                    }}
                  >
                    Overview
                  </button>

                  <button
                    className={`text-left px-3 py-2 rounded-md text-sm cursor-pointer ${
                      selectedTab === "permission"
                        ? "bg-discord-btn-neutral text-white"
                        : "text-discord-muted hover:text-white hover:bg-discord-bg"
                    }`}
                    onClick={() => {
                      setSelectedTab("permission");
                      setChannelSidebar(false);
                    }}
                  >
                    Permissions
                  </button>

                  <button
                    className="text-left px-3 py-2 rounded-md bg-discord-danger text-white mt-2 text-sm cursor-pointer flex items-center justify-between"
                    onClick={() => {
                      setDeleteChannel(true);
                      setChannelSidebar(false);
                    }}
                  >
                    Delete Channel <MdDeleteForever size={16} />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <GiHamburgerMenu
          size={28}
          className="cursor-pointer text-discord-muted absolute top-10 custom2:hidden block left-8"
          onClick={() => setChannelSidebar(true)}
        />

        <div className=" bg-discord-sidebar w-full flex flex-col pl-30 pt-5">
          {selectedTab === "overview" ? (
            <div className="mb-8 custom2:max-w-[500px] ">
              <label className="block text-xs text-discord-uted mb-2 uppercase tracking-wide">
                Channel Name
              </label>

              <div className="w-full bg-discord-input text-white px-3 py-2 rounded-md outline-none border border-transparent focus:border-discord-blurple flex justify-between">
                <input
                  type="text"
                  placeholder={
                    editChannelLoading ? "Loading..." : "Enter channel name"
                  }
                  value={channelName}
                  onChange={(e) => {
                    setChannelName(e.target.value);
                  }}
                  onKeyDown={(e) => handleEditChannelnameKey(e)}
                  className="w-[80%] outline-0 "
                />

                <button
                  onClick={handleEditChannelName}
                  className="bg-discord-success text-xs px-3 py-1 rounded-md cursor-pointer"
                >
                  {editChannelLoading ? "Loading..." : "Save"}
                </button>
              </div>

              {error && errorType === "editChannel" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mb-3 px-3 py-2 rounded-lg bg-discord-danger/10 border border-discord-danger/30 text-discord-danger text-sm flex items-center gap-2 mt-3"
                >
                  <span className="font-bold">!</span>
                  <span>{error}</span>
                </motion.div>
              )}
            </div>
          ) : null}
        </div>

        <div className="bg-discord-sidebar flex flex-col items-end px-10 custom2:px-20 pt-10">
          <FaCircleXmark
            size={28}
            className="cursor-pointer text-discord-muted"
            onClick={() => {
              navigate(`/server/${serverId}`);
            }}
          />
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
