import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import ServerSideBar from "../Components/ServerSideBar";

const ServerPage = ({ setUser, user }) => {
  const { serverId } = useParams();
  const [server, setServer] = useState(null);
  const [inviteToServerPopUp, setInviteToServerPopUp] = useState(false);

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

  return (
    <>
      <Sidebar setUser={setUser} user={user} />
      <ServerSideBar
        server={server}
        setInviteToServerPopUp={setInviteToServerPopUp}
        setUser={setUser}
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
    </>
  );
};

export default ServerPage;
