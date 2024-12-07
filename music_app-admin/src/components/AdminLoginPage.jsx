import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../App"; // Import base API URL
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/api/users/login`, {
        email,
        password,
      });
      if (response.data.success) {
        const { user } = response.data;
        if (user.isAdmin) {
          toast.success("Admin login successful!");

          // Save token and user info to local storage
          const { token } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          // Redirect to admin dashboard
          navigate("/add-song");
        } else {
          toast.error(
            "Access denied. You are not authorized to access the admin panel."
          );
        }
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Error during login. Please check your credentials.");
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
      <div className="flex flex-col w-full sm:w-[400px] h-auto sm:h-[400px] shadow-lg rounded-lg overflow-hidden bg-[#282828]">
        <div className="flex flex-col items-center justify-center w-full bg-[#3D9EA0] text-white p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Admin Sign In</h2>
          <form
            className="flex flex-col w-full sm:w-2/3 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col space-y-4 w-full max-w-xs mx-auto mt-6">
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
              onClick={handleLogin}
              className="bg-black text-white rounded-md py-2 font-semibold w-32 mx-auto shadow-xl border-solid border-2 border-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-900"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminLoginPage;
