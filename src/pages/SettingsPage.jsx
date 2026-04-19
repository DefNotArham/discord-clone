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

  const [editUsername, setEditUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");

  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const [isLoading5, setIsLoading5] = useState(false);

  const [changePass, setChangePass] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setNewConfirmPassword] = useState("");

  const [deleteAccPassword, setDeleteAccPassword] = useState("");
  const [deleteAccount, setDeleteAccount] = useState(false);

  const handleEditDisplay = async () => {
    if (editDisplayName) {
      if (newDisplayName.length < 3 || newDisplayName.length > 20) {
        setError("Display name must be 3–20 characters");
        setErrorType("displayName");

        setTimeout(() => {
          setError("");
          setErrorType("");
        }, 3000);
        return;
      }

      setIsLoading1(true);
      try {
        const response = await axios.patch(
          "http://localhost:8000/user/change-displayName",
          { newDisplayName },
          { withCredentials: true },
        );

        setUser((prev) => ({
          ...prev,
          displayName: newDisplayName,
        }));

        setIsLoading1(false);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
        setErrorType("displayName");
        setIsLoading1(false);

        setTimeout(() => {
          setError("");
          setErrorType("");
        }, 3000);
      }
    }

    setEditDisplayName(!editDisplayName);
  };

  const handleChangeUsername = async () => {
    if (!editUsername) {
      setEditUsername(true);
      return;
    }

    if (newUsername === "") {
      setEditUsername(false);
      return;
    }

    if (editUsername) {
      setIsLoading2(true);
      try {
        const response = await axios.patch(
          "http://localhost:8000/user/change-username",
          { newUsername },
          { withCredentials: true },
        );

        if (!response.data.success) {
          setError(response.data.message);
          setErrorType("username");
          setTimeout(() => {
            setError("");
            setErrorType("");
          }, 3000);

          return;
        }

        setUser((prev) => ({
          ...prev,
          username: newUsername,
        }));

        setIsLoading2(false);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data.message);
        setErrorType("username");
        setIsLoading2(false);

        setTimeout(() => {
          setError("");
          setErrorType("");
        }, 3000);
      }
    }
  };

  const handleChangePassword = async () => {
    setIsLoading3(true);
    setChangePass(true);
    try {
      const response = await axios.patch(
        "http://localhost:8000/user/change-password",
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        setChangePass(false);
        setIsLoading3(false);

        setCurrentPassword("");
        setNewPassword("");
        setNewConfirmPassword("");

        setUser((prev) => ({
          ...prev,
          password: newPassword,
        }));
      }
    } catch (error) {
      console.log(error);
      setIsLoading3(false);
      setError(error?.response?.data.message);
      setErrorType("password");

      setCurrentPassword("");
      setNewPassword("");
      setNewConfirmPassword("");

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleChangePassKey = (e) => {
    if (e.key === "Enter") {
      handleChangePassword();
    }
  };

  const handleLogout = async () => {
    setIsLoading4(true);
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
        setIsLoading4(false);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data.message);
      setErrorType("logout");

      setIsLoading4(false);

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading5(true);
      const response = await axios.delete(
        "http://localhost:8000/user/delete-account",
        {
          data: { password: deleteAccPassword },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        setIsLoading5(false);
        setDeleteAccount(false);
        setIsAuthentication(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data.message);
      setErrorType("deleteaccount");
      setIsLoading5(false);

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleDeleteAccKey = (e) => {
    if (e.key === "Enter") {
      handleDeleteAccount();
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
                      error && errorType === "displayName"
                        ? "border-red-500"
                        : ""
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

                  {error && errorType === "displayName" ? (
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
              disabled={isLoading1}
              className="text-sm text-white hover:underline cursor-pointer hover:-translate-y-1 transition-all ease-in-out bg-emerald-700 px-3 py-1 rounded-lg"
            >
              {isLoading1 ? "Saving..." : editDisplayName ? "Save" : "Edit"}
            </button>
          </div>

          <div className="bg-[#0f3f36] p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-gray-300">Username</p>
              {editUsername ? (
                <>
                  <input
                    className={`border p-2 text-sm rounded-2xl mt-2 ${
                      error && errorType === "username" ? "border-red-500" : ""
                    }`}
                    placeholder="Enter new username"
                    onChange={(e) => setNewUsername(e.target.value)}
                    value={newUsername}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleChangeUsername();
                      }
                    }}
                  />
                  {error && errorType === "username" ? (
                    <p className="text-red-500 text-xs mt-2 ml-2"> {error}</p>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <span className="font-semibold">@{user.username}</span>
              )}
            </div>
            <button
              onClick={handleChangeUsername}
              disabled={isLoading2}
              className="text-sm text-white hover:underline cursor-pointer hover:-translate-y-1 transition-all ease-in-out bg-emerald-700 px-3 py-1 rounded-lg"
            >
              {isLoading2 ? "Saving..." : editUsername ? "Save" : "Edit"}
            </button>
          </div>

          <div className="bg-[#0f3f36] p-4 rounded-2xl flex justify-between items-center">
            <p className="text-gray-300">Email</p>
            <span className="font-semibold">{user.email}</span>
          </div>

          <div className="space-y-3">
            <button
              className="bg-[#0f3f36] hover:bg-[#124f45] transition p-4 rounded-2xl flex justify-between items-center cursor-pointer w-full"
              onClick={() => setChangePass(true)}
              disabled={isLoading3}
            >
              <span className="font-medium">
                {isLoading3 ? "Loading..." : "Change Password"}
              </span>
              <span className="text-gray-400">
                <FaEdit />
              </span>
            </button>

            <button
              className="bg-[#0f3f36] hover:bg-[#124f45] transition p-4 rounded-2xl flex justify-between items-center cursor-pointer w-full"
              onClick={() => handleLogout()}
            >
              <span className="font-medium">Log out</span>
              <span className="text-gray-400">
                <MdArrowOutward />
              </span>
            </button>

            <button
              onClick={() => {
                setDeleteAccount(true);
              }}
              className="bg-[#2a0f14] hover:bg-red-950 transition p-4 rounded-2xl flex justify-between items-center cursor-pointer w-full"
            >
              <span className="font-medium text-red-400">Delete Account</span>
              <span className="text-red-400">⚠</span>
            </button>
          </div>
        </div>

        {changePass ? (
          <>
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setChangePass(false)}
            ></div>
            <div className="fixed bg-emerald-500  flex flex-col gap-3 p-10 rounded-2xl w-[33%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
              <div className="w-full flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-white-800">
                  Change Password
                </h2>
                {error && errorType === "password" ? (
                  <p className="font-semibold text-red-500">{error}</p>
                ) : (
                  ""
                )}
                <form
                  className="w-full flex flex-col gap-3"
                  onKeyDown={(e) => handleChangePassKey(e)}
                >
                  <input
                    type="password"
                    placeholder="Current password"
                    className={`px-4 py-2 border rounded-lg outline-none w-full ${
                      error && errorType ? "border-red-500" : ""
                    } `}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className={`px-4 py-2 border rounded-lg outline-none w-full ${
                      error && errorType ? "border-red-500" : ""
                    } `}
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className={`px-4 py-2 border rounded-lg outline-none w-full ${
                      error && errorType === "password" ? "border-red-500" : ""
                    } `}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                    value={confirmNewPassword}
                  />
                </form>
              </div>

              <div className="flex justify-between gap-5 mt-5">
                <button
                  onClick={() => setChangePass(false)}
                  className="bg-[#116852] px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleChangePassword()}
                  className="bg-[#116852] px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </>
        ) : null}

        {deleteAccount ? (
          <>
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setDeleteAccount(false)}
            ></div>
            <div className="fixed bg-[#480101] flex flex-col gap-3 p-10 rounded-2xl w-[33%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
              <div className="w-full flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-white-800">
                  Delete Account
                </h2>
                {error && errorType === "deleteaccount" ? (
                  <p className="font-semibold text-red-500">{error}</p>
                ) : (
                  ""
                )}

                <input
                  type="password"
                  placeholder="Password"
                  onKeyDown={(e) => handleDeleteAccKey(e)}
                  className={`px-4 py-2 border rounded-lg outline-none w-full ${
                    error && errorType === "deleteaccount"
                      ? "border-red-500"
                      : ""
                  } `}
                  onChange={(e) => setDeleteAccPassword(e.target.value)}
                  value={deleteAccPassword}
                />
              </div>

              <div className="flex justify-between gap-5 mt-5">
                <button
                  onClick={() => setDeleteAccount(false)}
                  className="bg-[#6e6e6e] px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteAccount()}
                  className="bg-[#a50303] px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SettingsPage;
