import React, { useEffect } from "react";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";

import useFriendStore from "../../Stores/Friend.Store";

const FriendReq = () => {
  const {
    friendRequests,
    loadFriendRequests,
    addFriend,
    acceptFriendReq,
    friendError,
    errorType,
  } = useFriendStore();

  useEffect(() => {
    const fetchData = async () => {
      await loadFriendRequests();
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-8 py-6 text-white ml-85">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Friend Requests</h1>
        <p className="text-gray-400 text-sm">
          These people want to be your friend
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {friendRequests.map((req) => (
          <div
            key={req._id}
            className="flex items-center justify-between bg-[#2b2d31] hover:bg-[#313338] transition-all rounded-lg px-4 py-3 group ease-in-out"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center font-bold">
                {req.displayName[0].toUpperCase()}
              </div>

              <div className="cursor-default">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{req.displayName}</p>
                  <p className="text-xs text-discord-muted opacity-0 group-hover:opacity-100 transition-all ease-in-out">
                    {req.username}
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  Sent you a friend request
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => acceptFriendReq(req._id)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-green-500 transition-all cursor-pointer"
              >
                <HiOutlineCheck size={18} />
              </button>

              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-red-500 transition-all cursor-pointer">
                <HiOutlineX size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendReq;
