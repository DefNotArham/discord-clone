import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import socket from "../../socket/socket.js";
import useAuthStore from "../../Stores/Auth.Store.js";
import { useParams } from "react-router-dom";
import axios from "axios";

const PrivateMessage = () => {
  const { user } = useAuthStore();

  const [dm, setDm] = useState([]);

  const [messageInput, setMessageInput] = useState("");

  const { friendId } = useParams();

  useEffect(() => {
    const fetchDm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/dm/loadDmMessages/${friendId}`,
          { withCredentials: true },
        );

        if (response?.data?.success) {
          setDm(response?.data?.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDm();

    socket.emit("privateDm", { userId: user._id, friendId });

    socket.on("receiveDM", (message) => {
      setDm((prev) => [...prev, message]);
    });

    return () => {
      socket.emit("leavePrivateDm", friendId);
      socket.off("receiveDM");
    };
  }, [friendId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageInput.trim()) return;

    socket.emit("sendDmMessage", {
      to: friendId,
      from: user,
      content: messageInput,
    });

    setMessageInput("");
  };

  return (
    <div className="w-full text-white ml-85 flex flex-col h-screen bg-[#313338]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
        {dm.map((m) => {
          const isMe = m.from._id === user._id;
          return (
            <div
              key={m._id}
              className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[70%] items-start ${isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                {!isMe && (
                  <div className="w-9 h-9 shrink-0 rounded-full bg-[#5865f2] text-xs flex items-center justify-center text-white font-bold">
                    {m.from?.username?.[0] || "U"}
                  </div>
                )}
                <div
                  className={`px-3 py-2 rounded-lg text-white flex flex-col gap-1 break-words ${isMe ? "bg-[#5865f2]" : "bg-[#2b2d31]"}`}
                >
                  {!isMe && (
                    <span className="text-xs font-bold">
                      {m.from?.displayName}
                    </span>
                  )}
                  <span className="text-sm">{m.content}</span>
                  <span className="text-[10px] text-gray-300">
                    {new Date(m.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="px-4 pb-6">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 bg-discord-input rounded-lg px-3 py-2"
        >
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-discord-placeholder outline-none text-sm"
            placeholder="Message"
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
          />
          <button className="p-1.5 rounded text-discord-muted opacity-50 cursor-pointer">
            <IoSend size={17} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrivateMessage;
