import React, { useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import AuthPages from "../../Components/Auth/AuthPages";
import useAuthStore from "../../Stores/Auth.Store";

const ResetPasswordPage = () => {
  const { loading, error, resetPassword } = useAuthStore();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useParams();

  const handleResetPassword = async () => {
    const result = await resetPassword(token, newPassword, confirmNewPassword);
    if (result?.success) {
      setSuccess("Password changed successfully");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleResetPassword();
    }
  };

  return (
    <AuthPages>
      {!success ? (
        <>
          <div className="flex flex-col text-center mb-10">
            <h1 className="text-3xl font-semibold text-white">
              Change Your Password
            </h1>
            <p className="mt-2 text-discord-muted">
              Enter a new password below to change your password.
            </p>
            {error ? (
              <p className="text-discord-danger text-sm mt-2 ml-2 font-bold">
                {error}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-full">
            <div>
              <input
                type="password"
                placeholder="New password"
                className={`border p-2 rounded-xl bg-discord-input text-white placeholder-discord-placeholder w-full transition-all ${
                  error
                    ? "border-discord-danger border-2"
                    : "border-2 border-discord-deep"
                }`}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={handleEnter}
              />
            </div>
            <div className="mt-3">
              <input
                type="password"
                placeholder="Confirm new password"
                className={`border p-2 rounded-xl bg-discord-input text-white placeholder-discord-placeholder w-full transition-all ${
                  error
                    ? "border-discord-danger border-2"
                    : "border-2 border-discord-deep"
                }`}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                onKeyDown={handleEnter}
              />
            </div>
          </div>
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="bg-discord-blurple hover:bg-discord-blurple-hover w-[80%] py-4 rounded-xl text-sm text-white cursor-pointer mt-3 flex items-center justify-center transition-colors"
          >
            {loading ? (
              <Oval
                height={26}
                width={26}
                color="#ffffff"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#ffffff"
                strokeWidth={7}
                strokeWidthSecondary={5}
              />
            ) : (
              "Reset Password"
            )}
          </button>
        </>
      ) : (
        <div className="flex flex-col text-center">
          <h1 className="text-discord-success text-2xl font-semibold">
            {success}
          </h1>
          <Link
            className="underline text-discord-blurple hover:text-discord-blurple-hover"
            to="/"
          >
            Go to Home
          </Link>
        </div>
      )}
    </AuthPages>
  );
};

export default ResetPasswordPage;
