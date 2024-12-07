import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.isAdmin) {
      navigate("/add-song");
    }
  }, [navigate]);

  const handleLogin = async () => {
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/api/users/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { user, token } = response.data;

        if (user.isAdmin) {
          toast.success("Admin login successful!");
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/add-song");
        } else {
          toast.error("Access denied. You are not authorized.");
        }
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#282828] h-screen">
      <div className="flex flex-col w-full sm:w-[400px] shadow-lg rounded-lg overflow-hidden bg-[#282828]">
        <div className="flex flex-col items-center justify-center w-full bg-[#3D9EA0] text-white p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Admin Sign In</h2>
          <form
            className="flex flex-col w-full sm:w-2/3 mt-6 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              type="button"
              onClick={handleLogin}
              className="bg-black text-white rounded-md py-2 font-semibold w-32 mx-auto shadow-xl transition transform hover:scale-105 hover:bg-gray-900"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="text-center mt-4">
            <a href="/reset-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminLoginPage;
