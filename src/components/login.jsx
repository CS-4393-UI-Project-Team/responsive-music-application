import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
{/* Social icon import functions are called within the body for functionality/visibility now */}
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      className="flex items-center justify-center bg-[#282828] h-screen"
      style={{ minHeight: "100vh" }}
    >
      {/* Wrapper with responsive width */}
      <div
        className="flex flex-col sm:flex-row w-full sm:w-[1000px] h-auto sm:h-[500px] shadow-lg rounded-lg overflow-hidden"
        style={{ backgroundColor: "#282828" }}
      >
        {/* Left Panel - Sign In */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-[#3D9EA0] text-white p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl flex items-center justify-center font-bold">Sign In</h2>
          <form className="flex flex-col w-full sm:w-2/3 space-y-4">
            {/* Username and Password Input Fields */}
            <div className="flex flex-col space-y-4 w-full max-w-xs mx-auto mt-6">
              {/* Username input */}
              <input
                type="text"
                placeholder="Username"
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Password input */}
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Functional checkbox */}
            <div className="flex items-center justify-center space-x-2 checkbox:border-[#3D9EA0]">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>

            {/* Forgot password link 
            - for enhancement, forgot password page should be implemented for demo
            */}
            <div className="flex items-center justify-center space-x-2 text-[#ffffff]">
              <a href="#">Forgot Your Password?</a>
            </div>
             {/* Button ease in and out transition is added for enhanced UI with mid range speed movement */}
            <button
              onClick={loginWithRedirect}
              className="bg-black text-[#ffffff] rounded-md py-2 font-semibold w-32 mx-auto shadow-xl hover:bg-[#000000] border-solid border-2 border-[#ffffff] transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#000000]"
            >
              Sign In
            </button>

            <div className="flex-grow border-t border-[#ffffff]"></div>
            <span className="mx-4 text-[#ffffff] font-bold flex items-center justify-center">Or continue with</span>
          </form>

          {/* Social icon section
          - included colored circular background removing plain visual of icons
          */}
          <div className="text-center mt-10 flex justify-center space-x-6 text-lg">
            <div className="bg-black p-3 rounded-full hover:bg-gray-700">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-white hover:text-blue-600 cursor-pointer"
              />
            </div>
            <div className="bg-black p-3 rounded-full hover:bg-gray-700">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="text-white hover:text-blue-700 cursor-pointer"
              />
            </div>
            <div className="bg-black p-3 rounded-full hover:bg-gray-700">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-white hover:text-pink-500 cursor-pointer"
              />
            </div>
            <div className="bg-black p-3 rounded-full hover:bg-gray-700">
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-white hover:text-blue-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Sign Up */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-[#000000] text-white p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Hello, Friend!</h2>
          <p className="text-sm sm:text-base text-center">
            Register with your personal details to use all provided site features.
          </p>
          {/* Button ease in and out transition is added for enhanced UI with mid range speed movement */}
          <button
            onClick={loginWithRedirect}
            className="bg-[#3D9EA0] text-white rounded-md py-2 px-4 w-32 font-semibold border-solid border-2 border-[#ffffff] transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#2B8A89]"
          >
            Sign Up
          </button>

          {/* Branding */}
          <div className="text-center mt-10">
            <h1 className="text-4xl sm:text-5xl font-bold">SoundWave</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

