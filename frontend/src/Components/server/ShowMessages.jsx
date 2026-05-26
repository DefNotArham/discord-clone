import { useParams } from "react-router-dom";
import socket from "../../socket/socket.js";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import useAuthStore from "../../Stores/Auth.Store.js";
import useServerStore from "../../Stores/Server.Store.js";

import ServerMembers from "./ServerMembers.jsx";

import { RiSidebarUnfoldFill } from "react-icons/ri";
import { FaCrown } from "react-icons/fa6";
import { IoIosExit } from "react-icons/io";

const API_URL = import.meta.env.VITE_API_URL;

const ShowMessages = () => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);

  const { user } = useAuthStore();
  const { currentServer } = useServerStore();

  const [sidebar, setSidebar] = useState(false);

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!channelId) return;

    const handleReceiveMessage = (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/message/getMessages/${channelId}`,
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    setMessages([]);
    fetchMessages();

    socket.emit("join_channel", channelId);
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.emit("leave_channel", channelId);
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [channelId]);

  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto bg-[#313338]  h-full">
      <div className=" justify-end flex md:hidden">
        <div
          className="bg-gray-300 p-2 rounded-full cursor-pointer"
          onClick={() => setSidebar(!sidebar)}
        >
          <RiSidebarUnfoldFill />
        </div>
      </div>

      {sidebar && (
        <div className="absolute right-0 top-0 h-full w-56 bg-discord-border z-50 overflow-y-auto p-3 text-white">
          <div className="flex justify-between items-start">
            <p className="text-xs text-gray-300 mb-2">
              Members {currentServer?.members?.length}
            </p>
            <IoIosExit
              size={20}
              className="cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>
          {currentServer?.members?.map((m) => {
            const isOwner =
              m._id.toString() === currentServer?.owner?.toString();
            return (
              <div
                key={m._id}
                className="flex items-center gap-2 p-2 rounded hover:bg-[#2b2d31] cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-xs font-bold text-white">
                  {m.username?.[0] || "U"}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{m.displayName}</span>
                  {isOwner && <FaCrown size={12} color="yellow" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {messages.map((m) => {
        const isMe = user._id === m.sender?._id;

        return (
          <div
            key={m._id}
            className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex gap-3 max-w-[70%] items-start ${
                isMe ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* AVATAR (others only) */}
              {!isMe && (
                <div className="w-9 h-9 shrink-0 rounded-full bg-[#5865f2] text-xs flex items-center justify-center text-white font-bold cursor-pointer">
                  {m.sender?.username?.[0] || "U"}
                </div>
              )}

              {/* BUBBLE */}
              <div
                className={`px-3 py-2 rounded-lg text-white flex flex-col gap-1 break-words whitespace-pre-wrap ${
                  isMe ? "bg-[#5865f2]" : "bg-[#2b2d31]"
                }`}
              >
                {/* USERNAME (others only) */}
                {!isMe && (
                  <span className="text-xs font-bold text-white">
                    {m.sender?.displayName || "Unknown"}
                  </span>
                )}

                {/* MESSAGE */}
                <span className="text-sm leading-relaxed">{m.content}</span>

                {/* TIME */}
                <span className="text-[10px] text-gray-300">
                  {m.createdAt
                    ? new Date(m.createdAt).toLocaleTimeString()
                    : ""}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      {/* AUTO SCROLL TARGET */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ShowMessages;
