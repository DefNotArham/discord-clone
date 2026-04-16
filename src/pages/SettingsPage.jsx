import React from "react";

import { MdDoNotDisturbOn } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";

const SettingsPage = ({ user }) => {
  return (
    <div className="bg-[#103f38] min-h-screen flex justify-center text-white">
      <div className="bg-[#116852] h-80 w-[80%] rounded-2xl mt-10 p-5">
        <div className="flex gap-2">
          <div className="w-10 h-10 relative">
            <img
              className="w-full h-full object-cover"
              src="/white_logo.png"
              alt=""
            />
            {user.status === "Online" ? (
              <FaCircle
                color="green"
                size={10}
                className="absolute bottom-0 right-0"
              />
            ) : user.status === "Do Not Disturb" ? (
              <MdDoNotDisturbOn
                color="red"
                size={13}
                className="absolute bottom-0 right-0"
              />
            ) : user.status === "Idle" ? (
              <FaMoon
                color="yellow"
                size={10}
                className="absolute bottom-0 right-0 "
              />
            ) : user.status === "Invisible" ? (
              <FaCircle
                color="gray"
                size={10}
                className="absolute bottom-[-1px] right-[-3px] "
              />
            ) : user.status === "Offline" ? (
              <FaCircle
                color="gray"
                size={10}
                className="absolute bottom-[-1px] right-[-3px] "
              />
            ) : null}
          </div>
          <div className="flex flex-col justify-center">
            <h1>{user.username}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
