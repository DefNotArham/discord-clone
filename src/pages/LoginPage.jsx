import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdError } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { Oval } from "react-loader-spinner";

import AuthPages from "../Components/AuthPages";

const LoginPage = ({ setIsAuthentication, setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorType, setErrorType] = useState("");

  const [forgotPassSucess, setForgotPassSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        navigate("/");
        setUser(response.data.user);
        setIsAuthentication(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data.message || "Server error");
      setErrorType(error?.response?.data.typeError || "general");
      setIsLoading(false);

      setTimeout(() => {
        setErrorMsg("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/forgot-password",
        { email },
        { withCredentials: true },
      );

      if (response.data.success) {
        setForgotPassSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      setErrorType("email");
      setForgotPassSuccess(false);
      setIsLoading(false);

      setTimeout(() => {
        setErrorMsg("");
        setErrorType("");
      }, 3000);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <AuthPages>
      <div className="flex flex-col text-center">
        <h1 className="text-2xl font-semibold">Welcome back!</h1>
        <p>We are happy to see again!</p>

        {errorType === "general" && (
          <p className="text-red-500 text-sm mt-2 ml-2 font-bold flex items-center gap-1">
            <MdError />
            {errorMsg}
          </p>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="w-full mt-5 flex flex-col gap-5"
      >
        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Email Address <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className={`border p-2 rounded-xl bg-white text-black w-full transition-all ${
              errorType === "general" || errorType === "email"
                ? "border-red-500 border-2 "
                : "border-2 border-white"
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errorType === "email" && (
            <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
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
              errorType === "general" || errorType === "password"
                ? "border-red-500 border-2 "
                : "border-2 border-white"
            }`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errorType === "password" && (
            <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
          )}
          <a
            onClick={handleForgotPassword}
            className="mt-2 ml-1 underline text-sm text-[#E8FFF1] cursor-pointer"
          >
            Forgot your password?
          </a>
        </div>

        <div className="w-full mt-7 flex flex-col items-center text-center">
          <button
            onClick={handleLogin}
            className="bg-chat-bg w-[80%] py-4 rounded-xl text-sm cursor-pointer flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Oval
                height={26}
                width={26}
                color="#ffff"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#ffff"
                strokeWidth={7}
                strokeWidthSecondary={5}
              />
            ) : (
              "Log in"
            )}
          </button>
          <p className="mt-3 text-[#E8FFF1]">
            Need an account?{" "}
            <Link to="/register" className="underline ">
              Register
            </Link>
          </p>
        </div>
      </form>

      {forgotPassSucess && (
        <>
          <div className="fixed inset-0 bg-black/50  z-40"></div>

          <div className="fixed bg-emerald-500 p-6 rounded-2xl top-10 z-50">
            <div className="flex items-center gap-3 text-lg font-semibold justify-center">
              <h1>Check your email to reset your password</h1>
              <IoCloseSharp
                size={25}
                className="cursor-pointer"
                onClick={() => setForgotPassSuccess(false)}
              />
            </div>
          </div>
        </>
      )}
    </AuthPages>
  );
};

export default LoginPage;
