import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdError } from "react-icons/md";
import { Oval } from "react-loader-spinner";

import AuthPages from "../../Components/Auth/AuthPages";
import useAuthStore from "../../Stores/Auth.Store";

const RegisterPage = () => {
  const { register, loading, error, errorType } = useAuthStore();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    const result = await register(email, username, password, DOB, displayName);
    if (result.success) {
      navigate("/verify-email");
    }
  };

  return (
    <AuthPages>
      <h1 className="text-2xl font-semibold text-white">Create an account</h1>
      {errorType === "general" ? (
        <p className="text-discord-danger text-sm mt-2 ml-2 font-bold flex items-center gap-1">
          <MdError />
          {error}
        </p>
      ) : (
        ""
      )}

      <form
        className="w-full mt-5 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateAccount();
        }}
      >
        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-discord-muted">
            Email Address <span className="text-discord-danger">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className={`border p-2 rounded-xl bg-discord-input text-white placeholder-discord-placeholder w-full transition-all ${
              errorType === "email" || errorType === "general"
                ? "border-discord-danger border-2"
                : "border-2 border-discord-deep"
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errorType === "email" ? (
            <p className="text-discord-danger text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {error}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-discord-muted">
            Username <span className="text-discord-danger">*</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className={`border p-2 rounded-xl bg-discord-input text-white placeholder-discord-placeholder w-full transition-all ${
              errorType === "username" || errorType === "general"
                ? "border-discord-danger border-2"
                : "border-2 border-discord-deep"
            }`}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          {errorType === "username" ? (
            <p className="text-discord-danger text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {error}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-discord-muted">Display name</label>
          <input
            type="text"
            placeholder="Display name (optional)"
            className={`border p-2 rounded-xl bg-discord-input text-white placeholder-discord-placeholder w-full transition-all ${
              errorType === "general" || errorType === "displayName"
                ? "border-discord-danger border-2"
                : "border-2 border-discord-deep"
            }`}
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          {errorType === "displayName" ? (
            <p className="text-discord-danger text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {error}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-discord-muted">
            Password <span className="text-discord-danger">*</span>
          </label>
          <input
            type="Password"
            placeholder="Password"
            className={`border p-2 rounded-xl bg-discord-input text-white placeholder-discord-placeholder w-full transition-all ${
              errorType === "password" || errorType === "general"
                ? "border-discord-danger border-2"
                : "border-2 border-discord-deep"
            }`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {errorType === "password" ? (
            <p className="text-discord-danger text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {error}
            </p>
          ) : (
            ""
          )}

          {/* <div className="text-sm mt-3">
            <p>* Must be at least 8 characters long </p>
            <p>* Must include atleast one number </p>
            <p>* Must include at least one letter </p>
            <p>* Must include at least one uppercase letter </p>
            <p>* Must include a special character (!@#$%^&*) </p>
          </div> */}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2 text-discord-muted">
            Date of Birth <span className="text-discord-danger">*</span>
          </label>
          <input
            type="date"
            className={`border p-2 rounded-xl bg-discord-input text-white w-full transition-all ${
              errorType === "dob" || errorType === "general"
                ? "border-discord-danger border-2"
                : "border-2 border-discord-deep"
            }`}
            onChange={(e) => setDOB(e.target.value)}
            value={DOB}
          />
          {errorType === "dob" ? (
            <p className="text-discord-danger text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {error}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="w-full mt-7 flex flex-col items-center text-center">
          <button
            className="bg-discord-blurple hover:bg-discord-blurple-hover w-[80%] py-4 rounded-xl text-sm text-white cursor-pointer flex items-center justify-center transition-colors"
            type="submit"
            disabled={loading}
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
              "Create account"
            )}
          </button>
          <p className="mt-3 text-discord-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-discord-blurple hover:text-discord-blurple-hover"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthPages>
  );
};

export default RegisterPage;
