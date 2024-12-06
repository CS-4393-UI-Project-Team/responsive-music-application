// src/components/register.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../App"; // Import base API URL
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/api/users/register`, {
        username,
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Registration successful!");

        // Automatically log in after successful registration
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to user profile or home
        navigate("/");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-[#282828] h-screen"
      style={{ minHeight: "100vh" }}
    >
      {/* Wrapper */}
      <div className="flex flex-col w-full sm:w-[400px] h-auto sm:h-[500px] shadow-lg rounded-lg overflow-hidden bg-[#282828]">
        <div className="flex flex-col items-center justify-center w-full bg-[#3D9EA0] text-white p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Sign Up</h2>
          <form
            className="flex flex-col w-full sm:w-2/3 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col space-y-4 w-full max-w-xs mx-auto mt-6">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <button
              type="button"
              onClick={handleRegister}
              className="bg-black text-white rounded-md py-2 font-semibold w-32 mx-auto shadow-xl border-solid border-2 border-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-900"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-white hover:underline mt-4"
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;
