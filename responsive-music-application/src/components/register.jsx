import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${url}/api/users/register`, {
        username,
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[400px]">
        <h1 className="text-2xl font-bold text-center text-[#00CFFF]">
          Create Account
        </h1>
        <p className="text-center text-gray-400 mb-8">Join SoundWave today</p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-300 block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:outline-none"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full bg-[#00CFFF] text-white p-3 rounded-lg font-bold hover:bg-[#00AEDD]"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#00CFFF] hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
