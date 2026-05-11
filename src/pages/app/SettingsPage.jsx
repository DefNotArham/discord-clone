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
  const {
    user,
    loading,
    error,
    errorType: authErrorType,
    // Logout
    logoutUser,

    // Delete account
    deleteAccount,
  } = useAuthStore();
  const {
    errorType,
    // change DisplayName
    changeDisplayName,
    editDisplayError,
    displayNameLoading,

    // Change username
    changeUsername,
    userNameLoading,
    editUsernameError,

    // Change password
    changePasswordError,
    changePassword,
    changePasswordLoading,
  } = useUserStore();

  const navigate = useNavigate();

  const [editDisplayName, setEditDisplayName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName);

  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username);

  const [isLoading4, setIsLoading4] = useState(false);
  const [isLoading5, setIsLoading5] = useState(false);

  const [changePass, setChangePass] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setNewConfirmPassword] = useState("");

  const [deleteAccPassword, setDeleteAccPassword] = useState("");
  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);

  const [logout, setLogout] = useState(false);

  const handleEditDisplay = async () => {
    if (!editDisplayName) {
      setEditDisplayName(true);
      return;
    }
    const result = await changeDisplayName(newDisplayName);
    if (result?.success) {
      setEditDisplayName(false);
    }
  };

  const handleChangeUsername = async () => {
    if (!editUsername) {
      setEditUsername(true);
      return;
    }

    const result = await changeUsername(newUsername);
    if (result?.success) {
      setEditUsername(false);
      setNewUsername("");
    }
  };

  const handleChangePassword = async () => {
    const result = await changePassword(
      currentPassword,
      newPassword,
      confirmNewPassword,
    );

    if (result?.success) {
      setChangePass(false);
      setCurrentPassword("");
      setNewPassword("");
      setNewConfirmPassword("");
    }
  };

  const handleChangePassKey = (e) => {
    if (e.key === "Enter") {
      handleChangePassword();
    }
  };

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate("/login");
    }
  };

  const handleDeleteAccount = async () => {
    const result = await deleteAccount(deleteAccPassword);

    if (result.success) {
      setDeleteAccountPopup(false);
      navigate("/login");
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
                      editUsernameError && errorType === "username"
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

                  {editUsernameError && errorType === "username" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mb-3 px-3 py-2 rounded-lg bg-discord-dnd/10 border border-discord-dnd/30 text-discord-dnd text-sm flex items-center gap-2 mt-2"
                    >
                      <span className="font-bold">!</span>
                      <span>{editUsernameError}</span>
                    </motion.div>
                  )}
                </>
              ) : (
                <span className="font-semibold">@{user?.username}</span>
              )}
            </div>
            <button
              onClick={handleChangeUsername}
              disabled={userNameLoading}
              className="text-sm text-white hover:underline cursor-pointer hover:-translate-y-1 transition-all ease-in-out bg-discord-blurple hover:bg-discord-blurple-hover px-3 py-1 rounded-lg"
            >
              {userNameLoading ? "Saving..." : editUsername ? "Save" : "Edit"}
            </button>
          </div>

          <div className="bg-discord-input p-4 rounded-2xl flex justify-between items-center">
            <p className="text-discord-muted">Email</p>
            <span className="font-semibold">{user?.email}</span>
          </div>

          <div className="space-y-3">
            <button
              className="bg-discord-input hover:bg-[#404249] transition p-4 rounded-2xl flex justify-between items-center cursor-pointer w-full"
              onClick={() => setChangePass(true)}
              disabled={changePasswordLoading}
            >
              <span className="font-medium">
                {changePasswordLoading ? "Loading..." : "Change Password"}
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
                setDeleteAccountPopup(true);
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
                        changePasswordError && errorType
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
                        changePasswordError && errorType
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
                        changePasswordError && errorType === "password"
                          ? "border-discord-dnd"
                          : "border-discord-deep"
                      }`}
                      onChange={(e) => setNewConfirmPassword(e.target.value)}
                      value={confirmNewPassword}
                    />
                  </form>

                  {changePasswordError && errorType === "password" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="px-3 py-2 rounded-lg bg-discord-dnd/20 border border-discord-dnd/50 text-discord-dnd text-sm flex items-center gap-2"
                    >
                      <span className="font-bold">!</span>
                      <span>{changePasswordError}</span>
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

                  {error && authErrorType === "logout" && (
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
          {deleteAccountPopup ? (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50"
                onClick={() => setDeleteAccountPopup(false)}
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

                  {error && authErrorType === "deleteaccount" && (
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
                      error && authErrorType === "deleteaccount"
                        ? "border-discord-dnd"
                        : "border-discord-deep"
                    }`}
                    onChange={(e) => setDeleteAccPassword(e.target.value)}
                    value={deleteAccPassword}
                  />
                </div>

                <div className="flex justify-between gap-5 mt-5">
                  <button
                    onClick={() => setDeleteAccountPopup(false)}
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
