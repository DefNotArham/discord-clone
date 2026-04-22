import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ServerSideBar from "../Components/ServerSideBar";

import { PiWarningFill } from "react-icons/pi";

const ServerPage = ({ setUser, user }) => {
  const { serverId } = useParams();
  const [server, setServer] = useState(null);
  const [inviteToServerPopUp, setInviteToServerPopUp] = useState(false);
  const [leaveConfirmPopup, setLeaveConfirmPopup] = useState(false);

  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");

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
  });

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
      console.log(error?.response?.data.message);
      setError(error?.response?.data.message);
      setErrorType("leaveServer");
      console.log(error);

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
      />
      {inviteToServerPopUp && (
        <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center">
          <div
            className="bg-[#103f38] p-5 rounded-2xl text-white w-[30%] flex flex-col gap-4"
            ref={inviteCodeRef}
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
          </div>
        </div>
      )}

      {leaveConfirmPopup ? (
        <>
          <div
            className="inset-0 bg-black/50 fixed z-[1000] flex justify-center items-center"
            ref={confirmLeaveRef}
          >
            <div className=" bg-[#480101] flex flex-col gap-3 p-10 rounded-2xl w-[33%] ">
              <h2 className="text-lg font-semibold text-white text-center ">
                Are you sure you want to leave the server?
              </h2>

              {error && errorType === "leaveServer" ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  <PiWarningFill className="text-red-500" size={30} />
                  <p className="text-red-500 text-center">{error}</p>
                </div>
              ) : null}

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
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ServerPage;
