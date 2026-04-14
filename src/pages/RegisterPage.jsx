import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthPages from "../Components/AuthPages";
import axios from "axios";
import { MdError } from "react-icons/md";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorType, setErrorType] = useState("");

  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        {
          email,
          username,
          password,
          DOB,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data.message || "Server error");
      setErrorType(error?.response?.data.typeError || "general");

      setTimeout(() => {
        setErrorMsg("");
        setErrorType("");
      }, 3000);
    }
  };

  return (
    <AuthPages>
      <h1 className="text-2xl font-semibold">Create an account</h1>
      {errorType === "general" ? (
        <p className="text-red-500 text-sm mt-2 ml-2 font-bold flex items-center gap-1">
          <MdError />
          {errorMsg}
        </p>
      ) : (
        ""
      )}

      <div className="w-full mt-5 flex flex-col gap-5">
        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Email Address <span className="text-red-700">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className={`border p-2 rounded-xl bg-white text-black w-full transition-all ${
              errorType === "email" || errorType === "general"
                ? "border-red-500 border-2 "
                : "border-2 border-white"
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errorType === "email" ? (
            <p className="text-red-500 text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {errorMsg}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Username <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className={`border p-2 rounded-xl bg-white text-black w-full transition-all ${
              errorType === "username" || errorType === "general"
                ? "border-red-500 border-2 "
                : "border-2 border-white"
            }`}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          {errorType === "username" ? (
            <p className="text-red-500 text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {errorMsg}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Password <span className="text-red-700">*</span>
          </label>
          <input
            type="Password"
            placeholder="Password"
            className={`border p-2 rounded-xl bg-white text-black w-full transition-all ${
              errorType === "password" || errorType === "general"
                ? "border-red-500 border-2 "
                : "border-2 border-white"
            }`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {errorType === "password" ? (
            <p className="text-red-500 text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {errorMsg}
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
          <label className="ml-1 my-2">
            Date of Birth <span className="text-red-700">*</span>
          </label>
          <input
            type="date"
            className={`border p-2 rounded-xl bg-white text-black w-full transition-all ${
              errorType === "dob" || errorType === "general"
                ? "border-red-500 border-2 "
                : "border-2 border-white"
            }`}
            onChange={(e) => setDOB(e.target.value)}
            value={DOB}
          />
          {errorType === "dob" ? (
            <p className="text-red-500 text-xs mt-2 ml-2 font-bold flex items-center gap-1">
              <MdError />
              {errorMsg}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="w-full mt-7 flex flex-col items-center text-center">
        <button
          className="bg-chat-bg w-[80%] py-4 rounded-xl text-sm cursor-pointer"
          onClick={handleCreateAccount}
        >
          Create account
        </button>
        <p className="mt-3 text-[#E8FFF1]">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </AuthPages>
  );
};

export default RegisterPage;
