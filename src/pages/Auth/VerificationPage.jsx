import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Oval } from "react-loader-spinner";

import useAuthStore from "../../Stores/Auth.Store";

import AuthPages from "../../Components/Auth/AuthPages";

const VerificationPage = () => {
  const [code, setCode] = useState("");
  const { verifyAccount, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleVerify = async () => {
    const result = await verifyAccount(code);
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <AuthPages>
      <div className="my-auto flex flex-col text-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">
            Verify your email address
          </h1>
          <p className="text-sm mt-3 text-discord-muted">
            We emailed you a six-digit code. Enter the code below to confirm
            your email address{" "}
          </p>
        </div>

        {error && (
          <p className="text-discord-danger mt-3 font-semibold">{error}</p>
        )}

        <div>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter code"
            className={`border-2 outline-none p-3 rounded-xl bg-discord-input text-white placeholder-discord-placeholder text-center text-lg tracking-widest w-full mt-5 ${
              error
                ? "border-discord-danger"
                : "border-discord-deep focus:border-discord-blurple"
            }`}
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
          <button
            onClick={handleVerify}
            disabled={loading}
            className="p-3 font-semibold cursor-pointer text-sm rounded-xl mx-auto mt-3 w-full bg-discord-blurple hover:bg-discord-blurple-hover text-white flex justify-center items-center transition-colors"
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
              "Verify"
            )}
          </button>
        </div>
      </div>
    </AuthPages>
  );
};

export default VerificationPage;
