import React from "react";
import { IoSend } from "react-icons/io5";
import socket from "../socket/socket.js";

const PrivateMessage = ({ friendId }) => {
  return (
    <div className="w-full text-white ml-85 flex flex-col h-screen bg-[#313338]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
        <div className="flex items-center justify-center h-full">
          <p className="text-discord-muted text-sm">
            Start of your conversation
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-6">
        <div className="flex items-center gap-2 bg-discord-input rounded-lg px-3 py-2">
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-discord-placeholder outline-none text-sm"
            placeholder="Message"
          />
          <button className="p-1.5 rounded text-discord-muted opacity-50 cursor-not-allowed">
            <IoSend size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateMessage;
