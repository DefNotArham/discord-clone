import React, { useEffect, useState, useRef, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

import Sidebar from "../../Components/Sidebar";
import ServerSideBar from "../../Components/ServerSideBar";

import { PiWarningFill } from "react-icons/pi";
import useAuthStore from "../../Stores/Auth.Store";
import useServerStore from "../../Stores/Server.Store";
import useChannelStore from "../../Stores/Channel.Store";

const ServerPage = () => {
  const { user } = useAuthStore();
  const {
    currentServer,
    loadCurrentServer,
    serverError,
    errorType: serverErrorType,
    leaveServer,
  } = useServerStore();

  const {
    loadChannels,
    createChannel,
    errorType: channelErrorType,
    loadingCreate,
    channelError,
  } = useChannelStore();

  const { serverId } = useParams();

  const [inviteToServerPopUp, setInviteToServerPopUp] = useState(false);
  const [leaveConfirmPopup, setLeaveConfirmPopup] = useState(false);

  const [newChannel, setNewChannel] = useState("");
  const [channelPopup, setChannelPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (serverId) {
      loadCurrentServer(serverId);
      loadChannels(serverId);
    }
  }, [serverId]);

  // const loadServers = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/auth/checkAuth",
  //       {},
  //       { withCredentials: true },
  //     );

  //     if (response.data.success) {
  //       setUser(response.data.user);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  // const handleLeaveServer = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/server/leave-server/${serverId}`,
  //       {},
  //       { withCredentials: true },
  //     );

  //     if (response.data.success) {
  //       setLeaveConfirmPopup(false);
  //       navigate("/");
  //       loadServers();
  //     }
  //   } catch (error) {
  //     setError(error?.response?.data.message);
  //     setErrorType("leaveServer");

  //     setTimeout(() => {
  //       setError("");
  //       setErrorType("");
  //     }, 3000);
  //   }
  // };

  const handleLeaveServer = async () => {
    const result = await leaveServer(serverId);

    if (result.success) {
      setLeaveConfirmPopup(false);
      navigate("/");
    }
  };

  // const handleCreateChannel = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/server/channel/create-channel/${serverId}`,
  //       { channelName: newChannel.trim() },
  //       { withCredentials: true },
  //     );

  //     if (response.data.success) {
  //       loadServers();
  //       setChannelPopup(false);
  //     }
  //   } catch (error) {
  //     setError(error?.response?.data.message);
  //     setErrorType("createChannel");

  //     setTimeout(() => {
  //       setError("");
  //       setErrorType("");
  //     }, 3000);
  //   }
  // };

  const handleCreateChannel = async () => {
    const result = await createChannel(serverId, newChannel);

    if (result.success) {
      setChannelPopup(false);
      setNewChannel("");
    }
  };

  const handleCreateChannelKey = (e) => {
    if (e.key === "Enter") {
      handleCreateChannel();
    }
  };

  return (
    <>
      <Sidebar />
      <ServerSideBar
        setInviteToServerPopUp={setInviteToServerPopUp}
        setLeaveConfirmPopup={setLeaveConfirmPopup}
        setChannelPopup={setChannelPopup}
      />

      {/* <Sidebar setUser={setUser} user={user} />
      <ServerSideBar
        server={server}
        setInviteToServerPopUp={setInviteToServerPopUp}
        setUser={setUser}
        setLeaveConfirmPopup={setLeaveConfirmPopup}
        user={user}
        setChannelPopup={setChannelPopup}
      /> */}

      {/* Invite to Server popup */}
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
              className="bg-discord-sidebar p-5 rounded-2xl text-white w-[60%] sm:w-[50%] md:w-[40%] flex flex-col gap-4"
              ref={inviteCodeRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-lg font-semibold">Invite to Server</h1>

              <p className="text-sm text-discord-muted">
                Share this invite code:
              </p>

              <div className="bg-discord-input p-2 rounded-lg text-center text-white">
                {currentServer?.inviteCode ?? "Loading..."}
              </div>

              <button
                className="bg-discord-blurple hover:bg-discord-blurple-hover py-2 rounded-lg cursor-pointer transition-colors"
                onClick={() => setInviteToServerPopUp(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leave server confirm popup */}
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
                className="bg-discord-sidebar flex flex-col gap-3 p-10 rounded-2xl sm:w-[55%] md:w-[45%]  lg:w-[33%]"
                ref={confirmLeaveRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-white text-center">
                  Are you sure you want to leave the server?
                </h2>

                {serverError && serverErrorType === "leaveServer" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mb-3 px-3 py-2 rounded-lg bg-discord-danger/10 border border-discord-danger/30 text-discord-danger text-sm flex items-center gap-2"
                  >
                    <span className="font-bold">!</span>
                    <span className="text-center">{serverError}</span>
                  </motion.div>
                )}

                <div className="flex items-center gap-3 mt-3">
                  <button
                    className="bg-discord-btn-neutral hover:bg-discord-btn-neutral-hover px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer text-white transition-colors"
                    onClick={() => setLeaveConfirmPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleLeaveServer();
                    }}
                    className="bg-discord-danger hover:bg-discord-danger-hover px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer text-white transition-colors"
                  >
                    Leave
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* Create channel popup */}
      <AnimatePresence>
        {channelPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-discord-sidebar w-[350px] p-5 rounded-2xl text-white"
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
                className="w-full h-10 px-3 rounded-lg bg-discord-input text-white placeholder-discord-placeholder outline-none mb-4"
                onChange={(e) => setNewChannel(e.target.value)}
                value={newChannel}
                onKeyDown={(e) => handleCreateChannelKey(e)}
              />

              {channelError && channelErrorType === "createChannel" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mb-3 px-3 py-2 rounded-lg bg-discord-danger/10 border border-discord-danger/30 text-discord-danger text-sm flex items-center gap-2"
                >
                  <span className="font-bold">!</span>
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setChannelPopup(false)}
                  className="px-4 py-2 rounded-lg bg-discord-btn-neutral hover:bg-discord-btn-neutral-hover transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-discord-blurple hover:bg-discord-blurple-hover transition cursor-pointer"
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
