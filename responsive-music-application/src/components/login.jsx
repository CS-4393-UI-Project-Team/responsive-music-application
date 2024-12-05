import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () =>
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: "http://localhost:5173/",
      },
    });

  return (
    <div
      className="flex items-center justify-center bg-[#282828] h-screen"
      style={{ minHeight: "100vh" }}
    >
      {/* Wrapper */}
      <div className="flex flex-col sm:flex-row w-full sm:w-[1000px] h-auto sm:h-[500px] shadow-lg rounded-lg overflow-hidden bg-[#282828]">
        {/* Left Panel - Sign In */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-[#3D9EA0] text-white p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Sign In</h2>
          <form
            className="flex flex-col w-full sm:w-2/3 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col space-y-4 w-full max-w-xs mx-auto mt-6">
              <input
                type="text"
                placeholder="Username"
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>
            <div className="flex items-center justify-center text-white">
              <a href="#" onClick={(e) => e.preventDefault()}>
                Forgot Your Password?
              </a>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="bg-black text-white rounded-md py-2 font-semibold w-32 mx-auto shadow-xl border-solid border-2 border-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-900"
            >
              Sign In
            </button>
            <div className="flex-grow border-t border-white my-4"></div>
            <span className="text-white font-bold">Or continue with</span>
          </form>
          <div className="flex justify-center space-x-6 text-lg">
            {[
              {
                icon: faFacebookF,
                label: "Facebook",
                color: "hover:text-blue-600",
              },
              {
                icon: faLinkedinIn,
                label: "LinkedIn",
                color: "hover:text-blue-700",
              },
              {
                icon: faInstagram,
                label: "Instagram",
                color: "hover:text-pink-500",
              },
              {
                icon: faTwitter,
                label: "Twitter",
                color: "hover:text-blue-400",
              },
            ].map(({ icon, label, color }, idx) => (
              <div
                key={idx}
                className="bg-black p-3 rounded-full hover:bg-gray-700"
                aria-label={`Login with ${label}`}
              >
                <FontAwesomeIcon
                  icon={icon}
                  className={`text-white cursor-pointer ${color}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Sign Up */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-black text-white p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Hello, Friend!</h2>
          <p className="text-sm sm:text-base text-center">
            Register with your personal details to use all provided site
            features.
          </p>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-[#3D9EA0] text-white rounded-md py-2 px-4 w-32 font-semibold border-solid border-2 border-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#2B8A89]"
          >
            Sign Up
          </button>
          <div className="text-center mt-10">
            <h1 className="text-4xl sm:text-5xl font-bold">SoundWave</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
