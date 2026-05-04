import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import { MdDoNotDisturbOn } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import useAuthStore from "../../Stores/Auth.Store";
import useUserStore from "../../Stores/User.Store";

const SettingsPage = () => {
  const { user } = useAuthStore();
  const { changeDisplayName, editDisplayError, errorType, displayNameLoading } =
    useUserStore();

  const navigate = useNavigate();

  const [editDisplayName, setEditDisplayName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);

  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

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

  const [logout, setLogout] = useState(false);

  // const handleEditDisplay = async () => {
  //   if (editDisplayName) {
  //     if (newDisplayName.length < 3 || newDisplayName.length > 20) {
  //       setError("Display name must be 3–20 characters");
  //       setErrorType("displayName");

  //       setTimeout(() => {
  //         setError("");
  //         setErrorType("");
  //       }, 3000);
  //       return;
  //     }

  //     setIsLoading1(true);
  //     try {
  //       const response = await axios.patch(
  //         "http://localhost:8000/user/change-displayName",
  //         { newDisplayName },
  //         { withCredentials: true },
  //       );

  //       setUser((prev) => ({
  //         ...prev,
  //         displayName: newDisplayName,
  //       }));

  //       setIsLoading1(false);
  //     } catch (error) {
  //       console.log(error);
  //       setError(error.response?.data?.message);
  //       setErrorType("displayName");
  //       setIsLoading1(false);

  //       setTimeout(() => {
  //         setError("");
  //         setErrorType("");
  //       }, 3000);
  //     }
  //   }

  //   setEditDisplayName(!editDisplayName);
  // };

  const handleEditDisplay = async () => {
    const result = await changeDisplayName(newDisplayName);

    if (result.success) {
      setEditDisplayName(!editDisplayName);
    }
  };

  const handleChangeUsername = async () => {
    if (!editUsername) {
      setEditUsername(true);
      return;
    }

    if (!newUsername.trim()) {
      setError("Username cannot be empty");
      setErrorType("username");

      setTimeout(() => {
        setError("");
        setErrorType("");
      }, 3000);
      return;
    }

    setIsLoading2(true);

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

    try {
      const response = await axios.patch(
        "http://localhost:8000/user/change-password",
        {
          currentPassword: currentPassword.trim(),
          newPassword: newPassword.trim(),
          confirmNewPassword: confirmNewPassword.trim(),
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
    <div className="min-h-screen bg-discord-bg flex justify-center items-start text-white px-4">
      <div className="w-full max-w-3xl mt-12 bg-discord-sidebar rounded-3xl shadow-xl overflow-hidden relative">
        <Link
          to="/"
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-discord-input transition-all ease-in-out hover:-translate-y-1"
        >
          <IoExit color="discord-muted" size={28} />
        </Link>

        <div className="h-24 bg-discord-blurple" />

        <div className="px-6 pb-6 -mt-10">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 relative rounded-2xl overflow-hidden border-4 border-discord-sidebar bg-black">
              <img
                src="/white_logo.png"
                alt="avatar"
                className="w-full h-full object-cover"
              />

              {user.status === "Online" ? (
                <FaCircle
                  className="absolute bottom-1 right-1 text-discord-online"
                  size={14}
                />
              ) : user.status === "Do Not Disturb" ? (
                <MdDoNotDisturbOn
                  className="absolute bottom-1 right-1 text-discord-dnd"
                  size={16}
                />
              ) : user.status === "Idle" ? (
                <FaMoon
                  className="absolute bottom-1 right-1 text-discord-warning"
                  size={14}
                />
              ) : (
                <FaCircle
                  className="absolute bottom-1 right-1 text-discord-offline"
                  size={14}
                />
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{user?.displayName}</h1>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8 space-y-4">
          <div className="bg-discord-input p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-discord-muted">Display Name</p>
              {editDisplayName ? (
                <>
                  <input
                    className={`border p-2 text-sm rounded-2xl mt-2 bg-discord-deep text-white placeholder-discord-placeholder ${
                      editDisplayError && errorType === "displayName"
                        ? "border-discord-dnd"
                        : "border-discord-deep"
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

                  {editDisplayError && errorType === "displayName" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mb-3 px-3 py-2 rounded-lg bg-discord-dnd/10 border border-discord-dnd/30 text-discord-dnd text-sm flex items-center gap-2 mt-2"
                    >
                      <span className="font-bold">!</span>
                      <span>{editDisplayError}</span>
                    </motion.div>
                  )}
                </>
              ) : (
                <span className="font-semibold">{newDisplayName}</span>
              )}
            </div>
            <button
              onClick={() => handleEditDisplay()}
              disabled={displayNameLoading}
              className="text-sm text-white hover:underline cursor-pointer hover:-translate-y-1 transition-all ease-in-out bg-discord-blurple hover:bg-discord-blurple-hover px-3 py-1 rounded-lg"
            >
              {displayNameLoading
                ? "Saving..."
                : editDisplayName
                  ? "Save"
                  : "Edit"}
            </button>
          </div>

          <div className="bg-discord-input p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-discord-muted">Username</p>
              {editUsername ? (
                <>
                  <input
                    className={`border p-2 text-sm rounded-2xl mt-2 bg-discord-deep text-white placeholder-discord-placeholder ${
                      error && errorType === "username"
                        ? "border-discord-dnd"
                        : "border-discord-deep"
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

                  {error && errorType === "username" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mb-3 px-3 py-2 rounded-lg bg-discord-dnd/10 border border-discord-dnd/30 text-discord-dnd text-sm flex items-center gap-2 mt-2"
                    >
                      <span className="font-bold">!</span>
                      <span>{error}</span>
                    </motion.div>
                  )}
                </>
              ) : (
                <span className="font-semibold">@{user.username}</span>
              )}
            </div>
            <button
              onClick={handleChangeUsername}
              disabled={isLoading2}
              className="text-sm text-white hover:underline cursor-pointer hover:-translate-y-1 transition-all ease-in-out bg-discord-blurple hover:bg-discord-blurple-hover px-3 py-1 rounded-lg"
            >
              {isLoading2 ? "Saving..." : editUsername ? "Save" : "Edit"}
            </button>
          </div>

          <div className="bg-discord-input p-4 rounded-2xl flex justify-between items-center">
            <p className="text-discord-muted">Email</p>
            <span className="font-semibold">{user.email}</span>
          </div>

          <div className="space-y-3">
            <button
              className="bg-discord-input hover:bg-[#404249] transition p-4 rounded-2xl flex justify-between items-center cursor-pointer w-full"
              onClick={() => setChangePass(true)}
              disabled={isLoading3}
            >
              <span className="font-medium">
                {isLoading3 ? "Loading..." : "Change Password"}
              </span>
              <span className="text-discord-muted">
                <FaEdit />
              </span>
            </button>

            <button
              className="bg-discord-input hover:bg-[#404249] transition p-4 rounded-2xl flex justify-between items-center cursor-pointer w-full"
              onClick={() => setLogout(true)}
            >
              <span className="font-medium">Log out</span>
              <span className="text-discord-muted">
                <MdArrowOutward />
              </span>
            </button>

            <button
              onClick={() => {
                setDeleteAccount(true);
              }}
              className="bg-discord-dnd/10 hover:bg-discord-dnd/20 transition p-4 rounded-2xl flex justify-between items-center cursor-pointer w-full"
            >
              <span className="font-medium text-discord-dnd">
                Delete Account
              </span>
              <span className="text-discord-dnd">⚠</span>
            </button>
          </div>
        </div>

        {/* Change Password modal */}
        <AnimatePresence>
          {changePass ? (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50"
                onClick={() => setChangePass(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="fixed bg-discord-sidebar flex flex-col gap-3 p-10 rounded-2xl  w-[70%] sm:w-[50%] md:w-[30%]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-full flex flex-col gap-3">
                  <h2 className="text-xl font-semibold text-white">
                    Change Password
                  </h2>

                  <form
                    className="w-full flex flex-col gap-3"
                    onKeyDown={(e) => handleChangePassKey(e)}
                  >
                    <input
                      type="password"
                      placeholder="Current password"
                      className={`px-4 py-2 border rounded-lg outline-none w-full bg-discord-input text-white placeholder-discord-placeholder ${
                        error && errorType
                          ? "border-discord-dnd"
                          : "border-discord-deep"
                      }`}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      value={currentPassword}
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className={`px-4 py-2 border rounded-lg outline-none w-full bg-discord-input text-white placeholder-discord-placeholder ${
                        error && errorType
                          ? "border-discord-dnd"
                          : "border-discord-deep"
                      }`}
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className={`px-4 py-2 border rounded-lg outline-none w-full bg-discord-input text-white placeholder-discord-placeholder ${
                        error && errorType === "password"
                          ? "border-discord-dnd"
                          : "border-discord-deep"
                      }`}
                      onChange={(e) => setNewConfirmPassword(e.target.value)}
                      value={confirmNewPassword}
                    />
                  </form>

                  {error && errorType === "password" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="px-3 py-2 rounded-lg bg-discord-dnd/20 border border-discord-dnd/50 text-discord-dnd text-sm flex items-center gap-2"
                    >
                      <span className="font-bold">!</span>
                      <span>{error}</span>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-between gap-5 mt-5">
                  <button
                    onClick={() => setChangePass(false)}
                    className="bg-discord-btn-neutral hover:bg-discord-btn-neutral-hover px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleChangePassword()}
                    className="bg-discord-blurple hover:bg-discord-blurple-hover px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer transition-colors"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>

        {/* Logout modal */}
        <AnimatePresence>
          {logout ? (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50"
                onClick={() => setLogout(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="fixed bg-discord-sidebar flex flex-col gap-3 p-10 rounded-2xl  w-[70%] sm:w-[50%] md:w-[30%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-full flex flex-col gap-3">
                  <h2 className="text-xl font-semibold text-white text-center">
                    Are you sure you want to log out?
                  </h2>

                  {error && errorType === "logout" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mb-3 px-3 py-2 rounded-lg bg-discord-dnd/20 border border-discord-dnd/50 text-discord-dnd text-sm flex items-center gap-2"
                    >
                      <span className="font-bold">!</span>
                      <span>{error}</span>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-between gap-5 mt-5">
                  <button
                    onClick={() => setLogout(false)}
                    className="bg-discord-btn-neutral hover:bg-discord-btn-neutral-hover px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleLogout()}
                    className="bg-discord-dnd hover:bg-discord-danger-hover px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>

        {/* Delete Account modal */}
        <AnimatePresence>
          {deleteAccount ? (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50"
                onClick={() => setDeleteAccount(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="fixed bg-discord-sidebar flex flex-col gap-3 p-10 rounded-2xl  w-[70%] sm:w-[50%] md:w-[30%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-full flex flex-col gap-3">
                  <h2 className="text-xl font-semibold text-white">
                    Delete Account
                  </h2>

                  {error && errorType === "deleteaccount" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mb-3 px-3 py-2 rounded-lg bg-discord-dnd/20 border border-discord-dnd/50 text-discord-dnd text-sm flex items-center gap-2"
                    >
                      <span className="font-bold">!</span>
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <input
                    type="password"
                    placeholder="Password"
                    onKeyDown={(e) => handleDeleteAccKey(e)}
                    className={`px-4 py-2 border rounded-lg outline-none w-full bg-discord-input text-white placeholder-discord-placeholder ${
                      error && errorType === "deleteaccount"
                        ? "border-discord-dnd"
                        : "border-discord-deep"
                    }`}
                    onChange={(e) => setDeleteAccPassword(e.target.value)}
                    value={deleteAccPassword}
                  />
                </div>

                <div className="flex justify-between gap-5 mt-5">
                  <button
                    onClick={() => setDeleteAccount(false)}
                    className="bg-discord-btn-neutral hover:bg-discord-btn-neutral-hover px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteAccount()}
                    className="bg-discord-dnd hover:bg-discord-danger-hover px-5 text-sm font-semibold py-3 rounded-lg w-[50%] cursor-pointer transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsPage;
