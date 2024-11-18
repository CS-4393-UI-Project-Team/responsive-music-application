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

  return (
    <div className="flex h-screen">
      {/* Left Panel - Sign In */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-[#3D9EA0] text-white p-10 space-y-6">
        <h2 className="text-3xl font-bold">Sign In</h2>
        <form className="flex flex-col w-2/3 space-y-4">
          <button
            onClick={loginWithRedirect}
            className="bg-white text-[#3D9EA0] rounded-md py-2 font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Right Panel - Sign Up */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-[#1C1C1C] text-white p-10 space-y-6">
        <h2 className="text-3xl font-bold">Hello, Friend!</h2>
        <p>
          Register with your personal details to use all provided site features.
        </p>
        <button
          onClick={loginWithRedirect}
          className="bg-[#3D9EA0] text-white rounded-md py-2 px-4 font-semibold"
        >
          Sign Up
        </button>
        <div className="text-center mt-10">
          <h1 className="text-5xl font-bold">SoundWave</h1>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
