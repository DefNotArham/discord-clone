import useServerStore from "../Stores/Server.Store";
import { FaCrown } from "react-icons/fa6";

const ServerMembers = () => {
  const { currentServer } = useServerStore();

  return (
    <div className="h-screen bg-discord-border w-[40%] p-3 text-white">
      <p className="text-xs text-gray-300 mb-2">Members</p>
      {currentServer?.members?.map((m) => {
        const isOwner = m._id.toString() === currentServer?.owner.toString();

        return (
          <div
            key={m._id}
            className="flex items-center gap-2 p-2 rounded hover:bg-[#2b2d31]"
          >
            <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-xs font-bold">
              {m.username?.[0] || "U"}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{m.username}</span>
              <span>
                {isOwner ? <FaCrown size={12} color="yellow" /> : null}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServerMembers;
