import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

import Sidebar from "../Components/Sidebar";
import ServerSideBar from "../Components/ServerSideBar";

import { PiWarningFill } from "react-icons/pi";

const ServerPage = ({ setUser, user }) => {
  const { serverId } = useParams();
  const [server, setServer] = useState(null);
  const [inviteToServerPopUp, setInviteToServerPopUp] = useState(false);
  const [leaveConfirmPopup, setLeaveConfirmPopup] = useState(false);

  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");

  const [newChannel, setNewChannel] = useState("");
  const [channelPopup, setChannelPopup] = useState(false);

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
    const handleLoadServer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/server/load-server/${serverId}`,
          { withCredentials: true },
        );

        if (response.data.success) {
          setServer(response?.data.server);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleLoadServer();
  }, [serverId]);

  const inviteCodeRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (inviteCodeRef.current && !inviteCodeRef.current.contains(e.target)) {
        setInviteToServerPopUp(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const confirmLeaveRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (
        confirmLeaveRef.current &&
        !confirmLeaveRef.current.contains(e.target)
      ) {
        setLeaveConfirmPopup(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const createChannelRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (
        createChannelRef.current &&
        !createChannelRef.current.contains(e.target)
      ) {
        setChannelPopup(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLeaveServer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/server/leave-server/${serverId}`,
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        setLeaveConfirmPopup(false);
        navigate("/");
        loadServers();
      }
    } catch (error) {
      setError(error?.response?.data.message);
      setErrorType("leaveServer");

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleCreateChannel = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/server/channel/create-channel/${serverId}`,
        { channelName: newChannel.trim() },
        { withCredentials: true },
      );

      if (response.data.success) {
        loadServers();
        setChannelPopup(false);
      }
    } catch (error) {
      setError(error?.response?.data.message);
      setErrorType("createChannel");

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
    }
  };

  return (
    <>
      <Sidebar setUser={setUser} user={user} />
      <ServerSideBar
        server={server}
        setInviteToServerPopUp={setInviteToServerPopUp}
        setUser={setUser}
        setLeaveConfirmPopup={setLeaveConfirmPopup}
        user={user}
        setChannelPopup={setChannelPopup}
      />
      <AnimatePresence>
        {inviteToServerPopUp && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-[#103f38] p-5 rounded-2xl text-white w-[30%] flex flex-col gap-4"
              ref={inviteCodeRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-lg font-semibold">Invite to Server</h1>

              <p className="text-sm text-gray-300">Share this invite code:</p>

              <div className="bg-gray-700 p-2 rounded-lg text-center">
                {server?.inviteCode ?? "Loading..."}
              </div>

              <button
                className="bg-emerald-500 py-2 rounded-lg cursor-pointer"
                onClick={() => setInviteToServerPopUp(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {leaveConfirmPopup ? (
          <>
            <motion.div
              className="inset-0 bg-black/50 fixed z-[1000] flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className=" bg-[#480101] flex flex-col gap-3 p-10 rounded-2xl w-[33%] "
                ref={confirmLeaveRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-white text-center ">
                  Are you sure you want to leave the server?
                </h2>

                {error && errorType === "leaveServer" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mb-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2"
                  >
                    <span className="text-red-400 font-bold">!</span>
                    <span className="text-center">{error}</span>
                  </motion.div>
                )}

                <div className="flex items-center gap-3 mt-3">
                  <button
                    className="bg-[#6e6e6e] px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer text-white"
                    onClick={() => setLeaveConfirmPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleLeaveServer();
                    }}
                    className="bg-[#a50303] px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer text-white"
                  >
                    Leave server
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {channelPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#103f38] w-[350px] p-5 rounded-2xl text-white"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              ref={createChannelRef}
            >
              <h2 className="text-xl font-semibold mb-4">Create Channel</h2>

              <input
                type="text"
                placeholder="Channel name"
                className="w-full h-10 px-3 rounded-lg bg-gray-200 text-black outline-none mb-4"
                onChange={(e) => setNewChannel(e.target.value)}
                value={newChannel}
              />

              {error && errorType === "createChannel" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mb-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2"
                >
                  <span className="text-red-400 font-bold">!</span>
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setChannelPopup(false)}
                  className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition cursor-pointer"
                  onClick={handleCreateChannel}
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServerPage;
