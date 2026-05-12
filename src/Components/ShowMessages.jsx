import { useParams } from "react-router-dom";
import socket from "../socket/socket.js";
import { useEffect, useState } from "react";

const ShowMessages = () => {
  const { channelId } = useParams();
  const { serverId } = useParams();
  const [messages, SetMessages] = useState([]);

  useEffect(() => {
    if (!channelId) return;

    const handleReceiveMessage = (messageData) => {
      SetMessages((prev) => [...prev, messageData]);
    };

    SetMessages([]);
    socket.emit("join_channel", channelId);

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.emit("leave_channel", channelId);
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [channelId]);

  return (
    <div className="flex flex-col gap-2 p-4">
      {messages.map((m, index) => (
        <div key={index} className="text-white">
          <span className="font-bold">{m.user?.username || "Unknown"}:</span>{" "}
          {m.content}
        </div>
      ))}
    </div>
  );
};

export default ShowMessages;
