import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { MdDoNotDisturbOn } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const SettingsPage = ({ user, setUser, setIsAuthentication }) => {
  const navigate = useNavigate();

  const [editDisplayName, setEditDisplayName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);

  const [error, setError] = useState("");

  const handleEditDisplay = async () => {
    if (editDisplayName) {
      if (newDisplayName.length < 3 || newDisplayName.length > 20) {
        setError("Display name must be 3–20 characters");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8000/user/change-displayName",
          { newDisplayName },
          { withCredentials: true },
        );

        setUser((prev) => ({
          ...prev,
          displayName: newDisplayName,
        }));
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
      }
    }

    setEditDisplayName(!editDisplayName);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        setUser(null);
        setIsAuthentication(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#0f2f2a] flex justify-center items-start text-white px-4">
      <div className="w-full max-w-3xl mt-12 bg-[#116852] rounded-3xl shadow-xl overflow-hidden relative">
        <Link
          to="/"
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-[#0f3f36] transition-all ease-in-out hover:-translate-y-1"
        >
          <IoExit color="#00c2a8" size={28} />
        </Link>

        <div className="h-24 bg-[#0b4f43]" />

        <div className="px-6 pb-6 -mt-10">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 relative rounded-2xl overflow-hidden border-4 border-[#116852] bg-black">
              <img
                src="/white_logo.png"
                alt="avatar"
                className="w-full h-full object-cover"
              />

              {user.status === "Online" ? (
                <FaCircle
                  className="absolute bottom-1 right-1 text-green-500"
                  size={14}
                />
              ) : user.status === "Do Not Disturb" ? (
                <MdDoNotDisturbOn
                  className="absolute bottom-1 right-1 text-red-500"
                  size={16}
                />
              ) : user.status === "Idle" ? (
                <FaMoon
                  className="absolute bottom-1 right-1 text-yellow-400"
                  size={14}
                />
              ) : (
                <FaCircle
                  className="absolute bottom-1 right-1 text-gray-400"
                  size={14}
                />
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8 space-y-4">
          <div className="bg-[#0f3f36] p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-gray-300">Display Name</p>
              {editDisplayName ? (
                <>
                  <input
                    className={`border p-2 text-sm rounded-2xl mt-2 ${
                      error ? "border-red-500" : ""
                    }`}
                    placeholder="Enter new display name"
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    value={newDisplayName}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEditDisplay();
                      }
                    }}
                  />

                  {error ? (
                    <p className="text-red-500 text-xs mt-2 ml-2"> {error}</p>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <span className="font-semibold">{newDisplayName}</span>
              )}
            </div>
            <button
              onClick={() => handleEditDisplay()}
              className="text-sm text-white hover:underline cursor-pointer hover:-translate-y-1 transition-all ease-in-out bg-emerald-700 px-3 py-1 rounded-lg"
            >
              {editDisplayName ? "Save" : "Edit"}
            </button>
          </div>

          <div className="bg-[#0f3f36] p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-gray-300">Username</p>
              <span className="font-semibold">@{user.username}</span>
            </div>
            <button className="text-sm text-white hover:underline cursor-pointer hover:-translate-y-1 transition-all ease-in-out bg-emerald-700 px-3 py-1 rounded-lg">
              Edit
            </button>
          </div>

          <div className="bg-[#0f3f36] p-4 rounded-2xl flex justify-between items-center">
            <p className="text-gray-300">Email</p>
            <span className="font-semibold">{user.email}</span>
          </div>

          <div className="space-y-3">
            <div className="bg-[#0f3f36] hover:bg-[#124f45] transition p-4 rounded-2xl flex justify-between items-center cursor-pointer">
              <span className="font-medium">Change Password</span>
              <span className="text-gray-400">
                <FaEdit />
              </span>
            </div>

            <div
              className="bg-[#0f3f36] hover:bg-[#124f45] transition p-4 rounded-2xl flex justify-between items-center cursor-pointer"
              onClick={() => handleLogout()}
            >
              <span className="font-medium">Log out</span>
              <span className="text-gray-400">
                <MdArrowOutward />
              </span>
            </div>

            <div className="bg-[#2a0f14] hover:bg-red-950 transition p-4 rounded-2xl flex justify-between items-center cursor-pointer">
              <span className="font-medium text-red-400">Delete Account</span>
              <span className="text-red-400">⚠</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
