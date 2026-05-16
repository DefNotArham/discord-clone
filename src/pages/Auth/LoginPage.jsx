import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdError } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { Oval } from "react-loader-spinner";

// import AuthPages from "../../Components/AuthPages";
import AuthPages from "../../Components/Auth/AuthPages";
import useAuthStore from "../../Stores/Auth.Store";

const LoginPage = () => {
  const { login, loading, forgotPassword, loadServer, error, errorType } =
    useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [forgotPassSucess, setForgotPassSuccess] = useState(false);

  const navigate = useNavigate();

  const loadServers = async () => {
    await loadServer();
  };

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
      loadServers();
    }
  };

  const handleForgotPassword = async () => {
    const result = await forgotPassword(email);
    if (result.success) {
      setForgotPassSuccess(true);
    } else {
      setForgotPassSuccess(false);
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
        <h1 className="text-2xl font-semibold text-white">Welcome back!</h1>
        <p className="text-discord-muted">We are happy to see again!</p>

        {errorType === "general" && (
          <p className="text-discord-danger text-sm mt-2 ml-2 font-bold flex items-center gap-1">
            <MdError />
            {error}
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
          <label className="ml-1 my-2 text-discord-muted">
            Email Address <span className="text-discord-danger">*</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className={`border p-2 rounded-xl bg-discord-input text-white placeholder-discord-placeholder w-full transition-all ${
              errorType === "general" || errorType === "email"
                ? "border-discord-danger border-2"
                : "border-2 border-discord-deep"
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errorType === "email" && (
            <p className="text-discord-danger text-sm mt-1">{error}</p>
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
              errorType === "general" || errorType === "password"
                ? "border-discord-danger border-2"
                : "border-2 border-discord-deep"
            }`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errorType === "password" && (
            <p className="text-discord-danger text-sm mt-1">{error}</p>
          )}
          <a
            onClick={handleForgotPassword}
            className="mt-2 ml-1 underline text-sm text-discord-muted hover:text-white cursor-pointer transition-all duration-200"
          >
            Forgot your password?
          </a>
        </div>

        <div className="w-full mt-7 flex flex-col items-center text-center">
          <button
            onClick={handleLogin}
            className="bg-discord-blurple hover:bg-discord-blurple-hover w-[80%] py-4 rounded-xl text-sm text-white cursor-pointer flex justify-center items-center transition-all duration-200"
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
              "Log in"
            )}
          </button>
          <p className="mt-3 text-discord-muted">
            Need an account?{" "}
            <Link
              to="/register"
              className="underline text-discord-blurple hover:text-discord-blurple-hover transition-all duration-200"
            >
              Register
            </Link>
          </p>
        </div>
      </form>

      {forgotPassSucess && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40"></div>

          <div className="fixed bg-discord-success p-6 rounded-2xl top-10 z-50">
            <div className="flex items-center gap-3 text-lg font-semibold justify-center text-discord-deep">
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
