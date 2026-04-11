import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthPages from "../Components/AuthPages";
import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");

  const [error, setError] = useState("");

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

      setError(response.data.error);
    } catch (error) {
      console.log(error);
      setError("Server error");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <AuthPages>
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <div className="w-full mt-5 flex flex-col gap-5">
        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Email Address <span className="text-red-700">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-xl bg-white text-black w-full"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Username <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded-xl bg-white text-black w-full"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Password <span className="text-red-700">*</span>
          </label>
          <input
            type="Password"
            placeholder="Password"
            className="border p-2 rounded-xl bg-white text-black w-full"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="flex flex-col items-start">
          <label className="ml-1 my-2">
            Date of Birth <span className="text-red-700">*</span>
          </label>
          <input
            type="date"
            className="border p-2 rounded-xl bg-white text-black w-full"
            onChange={(e) => setDOB(e.target.value)}
            value={DOB}
          />
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
