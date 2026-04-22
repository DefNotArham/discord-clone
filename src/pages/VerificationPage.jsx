import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthPages from "../Components/AuthPages";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const VerificationPage = ({ user, setUser }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/verifyEmail",
        { code: code.trim() },
        { withCredentials: true },
      );

      if (response.data.success) {
        setSuccess("Verified successfully!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Verification failed");
      setIsLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <AuthPages>
      <div className="my-auto flex flex-col text-center">
        {!success ? (
          <div className="text-center">
            <h1 className="text-2xl font-semibold">
              Verify your email address
            </h1>
            <p className="text-sm mt-3">
              We eamiled you a six-digit code. Enter the code below to confirm
              your email address{" "}
            </p>
          </div>
        ) : null}
        {error && <p className="text-red-500 mt-3 font-semibold">{error}</p>}

        <div>
          {success ? (
            <>
              <p className="text-green-500 mt-5 text-center font-semibold text-2xl">
                {success}
              </p>

              <Link
                to="/login"
                className="underline cursor-pointer text-emerald-500"
              >
                Go to Login
              </Link>
            </>
          ) : (
            <>
              <input
                type="text"
                maxLength={6}
                placeholder="Enter code"
                className={`border-2 outline-none p-3 rounded-xl text-white text-center text-lg tracking-widest w-full mt-5 ${
                  error
                    ? "border-red-500"
                    : "border-white focus:border-[#1d8347]"
                }`}
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="p-3 font-semibold cursor-pointer text-sm rounded-xl mx-auto mt-3 w-full bg-emerald-700 flex justify-center items-center "
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
                  "Verify"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </AuthPages>
  );
};

export default VerificationPage;
