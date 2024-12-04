import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
// Import the logo image
import SoundWaveLogo from '../assets/SoundWave Logo Components.png';

// Auth0 is removed currently for easier routing for now
function LoginPage() {
  const navigate = useNavigate(); // Use React Router for navigation

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({ email: "", password: "" });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Error handling is implemented for correctness in logging into application 
    // Initialize validation form
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Validate email input
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
      //email needs to be formatted in this expression
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    // Validate password input
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Update errors state with validation results
    setError(newErrors);

    // If form is valid, proceed to navigate
    if (isValid) {
      console.log("Form submitted:", { email, password });
      navigate("/home"); // Redirect to the home page
    }
  };

  return (
    <div 
      className="flex items-center justify-center bg-[#282828] h-screen shadow-lg shadow-cyan-500/50" 
      style={{ minHeight: "100vh" }}
    >
      <div 
        className="flex flex-col sm:flex-row w-full sm:w-[1000px] h-auto sm:h-[500px] shadow-lg shadow-cyan-500/50 rounded-lg overflow-hidden" 
        style={{ backgroundColor: "#282828" }}
      >
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-[#3D9EA0] text-white p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl flex items-center justify-center font-bold">
            Sign In
          </h2>
          <form
            className="flex flex-col w-full sm:w-2/3 space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-4 w-full max-w-xs mx-auto mt-6">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.email && (
                <span className="text-red-500 text-sm">{error.email}</span>
              )}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border rounded-full text-black focus:outline-none  focus:ring-2 focus:ring-blue-500"
              />
              {error.password && (
                <span className="text-red-500 text-sm">{error.password}</span>
              )}
            </div>
            <div className="flex items-center justify-center space-x-2 checkbox:border-[#3D9EA0]">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>
            <div className="flex items-center justify-center space-x-2 text-[#ffffff]">
              <a href="#">Forgot Your Password?</a>
            </div>
            <button
              type="submit"
              className="bg-black text-[#ffffff] rounded-md py-2 font-semibold w-32 mx-auto shadow-xl hover:bg-[#000000] border-solid border-2 border-[#ffffff] transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#000000]"
            >
              Sign In
            </button>
            <div className="flex-grow border-t border-[#ffffff]"></div>
            <span className="mx-4 text-[#ffffff] font-bold flex items-center justify-center">
              Or continue with
            </span>
          </form>
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

        {/* Right Side */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-[#000000] text-white p-6 sm:p-10 space-y-6">
          <p className="text-sm sm:text-base text-center">
            Register with your personal details to use all provided site
            features.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#3D9EA0] text-white rounded-md py-2 px-4 w-32 font-semibold border-solid border-2 border-[#ffffff] transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#2B8A89]"
          >
            Sign Up
          </button>
          <div className="text-center mt-6 flex items-center justify-center">
            <img src={SoundWaveLogo} alt="SoundWave Logo" className="h-10 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold">SoundWave</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

