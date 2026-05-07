import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import useServerStore from "../../Stores/Server.Store";

const ServerSettings = () => {
  const { currentServer } = useServerStore();

  const [tab, setTab] = useState("overview");

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

      {/* Main Content */}
      <div className="flex-1 p-10">
        <AnimatePresence mode="wait">
          {/* Overview */}
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

                <input
                  type="text"
                  className="w-full mt-2 px-3 py-2 bg-discord-input rounded-md outline-none focus:border-discord-blurple border border-transparent"
                  placeholder="Enter server name"
                />
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
                {currentServer.members.map((m) => (
                  <p>{m}</p>
                ))}
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
    </div>
  );
};

export default ServerSettings;
