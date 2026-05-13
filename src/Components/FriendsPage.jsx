import { FaUserFriends } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";

const MOCK_ONLINE = [
  { _id: "1", username: "nova_kai" },
  { _id: "2", username: "zephyr" },
  { _id: "3", username: "solenne" },
];

const MOCK_OFFLINE = [
  { _id: "3", username: "lunaris" },
  { _id: "4", username: "drift_x" },
];

const MOCK_REQUESTS = [
  { _id: "5", username: "phantom_v" },
  { _id: "6", username: "kaito99" },
];

const FriendsPage = () => {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden text-white ml-87">
      {/* Top bar */}
      <div className="flex items-center gap-6 px-6 py-3 border-b border-discord-border">
        <div className="flex items-center gap-2 font-semibold text-white">
          <FaUserFriends size={20} />
          <span>Friends</span>
        </div>

        <div className="w-[1px] h-5 bg-discord-border" />

        <div className="flex items-center gap-1">
          {["Online", "All", "Pending", "Add Friend"].map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 rounded text-sm transition-colors cursor-pointer ${
                tab === "Online"
                  ? "bg-discord-active text-white font-medium"
                  : tab === "Add Friend"
                    ? "text-discord-success hover:bg-discord-success/10 font-medium"
                    : "text-discord-muted hover:bg-discord-hover hover:text-white"
              }`}
            >
              {tab}
              {tab === "Pending" && (
                <span className="ml-1.5 bg-discord-danger text-white text-xs rounded-full px-1.5 py-0.5">
                  {MOCK_REQUESTS.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
        {/* Add Friend section */}
        <div className="bg-discord-sidebar rounded-xl p-5 flex flex-col gap-3">
          <p className="font-semibold text-white">Add Friend</p>
          <p className="text-discord-muted text-sm">
            You can add friends with their username.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter a username"
              className="flex-1 h-10 px-3 rounded-lg bg-discord-input text-white text-sm placeholder-discord-placeholder outline-none border border-discord-border focus:border-discord-blurple transition-colors"
            />
            <button className="px-4 h-10 rounded-lg bg-discord-blurple hover:bg-discord-blurple-hover text-white text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
              Send Request
            </button>
          </div>
        </div>

        {/* Pending requests */}
        {MOCK_REQUESTS.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-discord-muted text-xs font-semibold uppercase tracking-wide mb-1">
              Pending — {MOCK_REQUESTS.length}
            </p>
            {MOCK_REQUESTS.map((r) => (
              <div
                key={r._id}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-discord-hover group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-discord-blurple flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {r.username[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {r.username}
                    </p>
                    <p className="text-discord-muted text-xs">
                      Incoming Friend Request
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-full bg-discord-input hover:bg-discord-success/20 hover:text-discord-success text-discord-muted flex items-center justify-center transition-colors cursor-pointer">
                    <HiOutlineCheck size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-discord-input hover:bg-discord-danger/20 hover:text-discord-danger text-discord-muted flex items-center justify-center transition-colors cursor-pointer">
                    <HiOutlineX size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Online friends */}
        <div className="flex flex-col gap-1">
          <p className="text-discord-muted text-xs font-semibold uppercase tracking-wide mb-1">
            Online — {MOCK_ONLINE.length}
          </p>
          {MOCK_ONLINE.map((f) => (
            <FriendRow key={f._id} friend={f} online={true} />
          ))}
        </div>

        {/* Offline friends */}
        <div className="flex flex-col gap-1">
          <p className="text-discord-muted text-xs font-semibold uppercase tracking-wide mb-1">
            Offline — {MOCK_OFFLINE.length}
          </p>
          {MOCK_OFFLINE.map((f) => (
            <FriendRow key={f._id} friend={f} online={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FriendRow = ({ friend, online }) => (
  <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-discord-hover group transition-colors cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-discord-blurple flex items-center justify-center text-sm font-bold">
          {friend.username[0].toUpperCase()}
        </div>
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-discord-sidebar ${
            online ? "bg-discord-success" : "bg-discord-muted"
          }`}
        />
      </div>
      <div>
        <p className="text-white text-sm font-medium">{friend.username}</p>
        <p className="text-discord-muted text-xs">
          {online ? "Online" : "Offline"}
        </p>
      </div>
    </div>
    <button className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-discord-input text-discord-muted hover:text-white flex items-center justify-center transition-all cursor-pointer">
      <IoChatbubbleEllipses size={16} />
    </button>
  </div>
);

export default FriendsPage;
