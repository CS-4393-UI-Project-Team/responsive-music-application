// src/App.jsx

import React, { useContext } from "react";
import Sidebar from "./components/sidebar.jsx";
import Player from "./components/player.jsx";
import Display from "./components/Display.jsx";
import LoginPage from "./components/login.jsx";
import Footer from "./components/Footer.jsx"; // Import Footer component
import ShoppingCart from "./components/ShoppingCart"; // Import ShoppingCart component
import SearchPage from "./components/SearchPage"; // Import SearchPage component
import { PlayerContext } from "./context/PlayerContext.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading || !songsData) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#121212] flex flex-col">
      <Routes>
        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Search Page Route */}
        <Route path="/search" element={<SearchPage />} />

        {/* Shopping Cart Route */}
        <Route path="/cart" element={<ShoppingCart />} />

        {/* Main Application Route */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              songsData.length !== 0 ? (
                <>
                  <div className="flex-grow flex">
                    {/* Sidebar on the left */}
                    <Sidebar />
                    {/* Main content area */}
                    <Display />
                  </div>
                  {/* Player component stays at the bottom of the screen */}
                  <Player />
                  <Footer /> {/* Add Footer at the bottom */}
                  {/* Audio element for controlling audio */}
                  <audio
                    ref={audioRef}
                    src={track ? track.file : ""}
                    preload="auto"
                    className="hidden"
                  ></audio>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  Loading songs...
                </div>
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
