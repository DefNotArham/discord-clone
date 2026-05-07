import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import useServerStore from "../../Stores/Server.Store";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircleXmark } from "react-icons/fa6";

const ServerSettings = () => {
  const { currentServer, loadMembers, members, loadingMembers } =
    useServerStore();

  const [tab, setTab] = useState("overview");
  const navigate = useNavigate();

  const { serverId } = useParams();
  const [serverName, setServerName] = useState(currentServer?.name);

  useEffect(() => {
    loadMembers(serverId);
  }, [serverId]);

  return (
    <div className="min-h-screen w-full bg-discord-bg text-white flex">
      <div className="w-[260px] bg-discord-deep border-r border-discord-divider p-4">
        <h2 className="text-xs text-discord-muted uppercase mb-4">
          Server Settings
        </h2>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setTab("overview")}
            className={`text-left px-3 py-2 rounded-md text-sm cursor-pointer ${
              tab === "overview"
                ? "bg-discord-btn-neutral text-white"
                : "text-discord-muted hover:bg-discord-bg"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setTab("members")}
            className={`text-left px-3 py-2 rounded-md text-sm cursor-pointer ${
              tab === "members"
                ? "bg-discord-btn-neutral text-white"
                : "text-discord-muted hover:bg-discord-bg"
            }`}
          >
            Members
          </button>

          <button
            onClick={() => setTab("roles")}
            className={`text-left px-3 py-2 rounded-md text-sm cursor-pointer ${
              tab === "roles"
                ? "bg-discord-btn-neutral text-white"
                : "text-discord-muted hover:bg-discord-bg"
            }`}
          >
            Roles
          </button>

          <button
            onClick={() => setTab("danger")}
            className="text-left px-3 py-2 rounded-md text-sm bg-discord-danger mt-2 flex items-center justify-between cursor-pointer"
          >
            Delete Server <MdDeleteForever size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-10">
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h1 className="text-xl font-semibold mb-6">Overview</h1>

              <div className="bg-discord-deep p-4 rounded-lg max-w-[500px]">
                <label className="text-xs text-discord-muted">
                  Server Name
                </label>

                <div className="w-full mt-2 px-3 py-2 bg-discord-input rounded-md outline-none focus:border-discord-blurple border border-transparent">
                  <input
                    type="text"
                    placeholder="Enter server name"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    className="w-[85%] outline-0 "
                  />
                  <button className="bg-discord-success text-xs px-3 py-1 rounded-md cursor-pointer">
                    {false ? "Loading..." : "Save"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {tab === "members" && (
            <motion.div
              key="members"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h1 className="text-xl font-semibold mb-6">Members</h1>

              <div className="bg-discord-deep p-4 rounded-lg">
                {loadingMembers ? (
                  <p className="text-discord-muted text-sm">
                    Loading members...
                  </p>
                ) : members?.length === 0 ? (
                  <p className="text-discord-muted text-sm">No members found</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {members?.map((m) => (
                      <div
                        key={m._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center text-sm font-bold">
                            {m.displayName?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {m.displayName}
                            </p>
                            <p className="text-xs text-discord-muted">
                              @{m.username}
                            </p>
                          </div>
                        </div>

                        {currentServer?.owner !== m._id && (
                          <button className="text-xs text-discord-danger hover:underline cursor-pointer">
                            Kick
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {tab === "roles" && (
            <motion.div
              key="roles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h1 className="text-xl font-semibold mb-6">Roles</h1>

              <div className="bg-discord-deep p-4 rounded-lg">
                <p className="text-discord-muted text-sm">
                  Role system coming soon...
                </p>
              </div>
            </motion.div>
          )}

          {tab === "danger" && (
            <motion.div
              key="danger"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h1 className="text-xl font-semibold text-discord-danger mb-6">
                Danger Zone
              </h1>

              <div className="bg-discord-deep p-6 rounded-lg border border-discord-danger/30 max-w-[500px]">
                <p className="text-sm text-discord-muted mb-4">
                  Deleting this server will permanently remove all channels,
                  messages, and members.
                </p>

                <button className="bg-discord-danger px-4 py-2 rounded-md text-sm hover:opacity-80 flex items-center gap-2">
                  <MdDeleteForever /> Delete Server
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className=" flex flex-col items-end px-10 custom2:px-20 pt-10">
        <FaCircleXmark
          size={28}
          className="cursor-pointer text-discord-muted"
          onClick={() => {
            navigate(`/server/${serverId}`);
          }}
        />
      </div>
    </div>
  );
};

export default ServerSettings;
