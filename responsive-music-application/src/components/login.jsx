import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0(); // Destructure Auth0 hooks

  return (
    <div className="relative w-full min-h-screen bg-[#06A0B5] opacity-100">
      {/* Container for the login form */}
      <div className="container min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          {/* Header section with logo */}
          <div className="flex flex-row items-center justify-center mb-4">
            <h1 className="ml-2 text-3xl font-bold text-black">Music-App</h1>
          </div>

          {/* Authentication Status */}
          {isAuthenticated ? (
            <div className="text-center">
              <p className="text-lg">Welcome, {user.name}!</p>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="btn bg-[#06A0B5] text-white mt-4 w-full"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              {/* Page title */}
              <h1 className="text-2xl font-bold text-center mb-6">
                Login to Your Account
              </h1>
              {/* Auth0 Login Button */}
              <div className="text-center">
                <button
                  onClick={() => loginWithRedirect()}
                  className="btn bg-[#06A0B5] text-white mt-4 w-full"
                >
                  Log In with Auth0
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
