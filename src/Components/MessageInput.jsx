import { IoSend } from "react-icons/io5";
import useChannelStore from "../Stores/Channel.Store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket/socket.js";
import useAuthStore from "../Stores/Auth.Store";

const MessageInput = () => {
  const { currentChannel, loadChannel } = useChannelStore();
  const { serverId, channelId } = useParams();
  const [messageInput, setMessageInput] = useState("");

  const { user } = useAuthStore();

  useEffect(() => {
    if (serverId && channelId) {
      loadChannel(serverId, channelId);
    }
  }, [serverId, channelId, loadChannel]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageInput.trim()) return;

    socket.emit("send_message", {
      channelId,
      content: messageInput,
      user,
    });

    setMessageInput("");
  };

  return (
    <div className="px-4 pb-4">
      <form
        className="flex items-center gap-2 bg-discord-input rounded-lg px-3 py-2"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          className="flex-1 bg-transparent text-white placeholder-discord-placeholder outline-none text-sm"
          placeholder={`Message #${currentChannel?.name || "general"}`}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />

        <button
          type="submit"
          className="p-1.5 rounded transition-colors cursor-pointer text-discord-blurple hover:bg-discord-blurple/20"
        >
          <IoSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
