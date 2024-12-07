// src/App.jsx

import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Player from "./components/Player.jsx";
import Display from "./components/Display.jsx";
import LoginPage from "./components/login.jsx";
import RegisterPage from "./components/register.jsx";
import Footer from "./components/Footer.jsx"; // Import Footer component
import ShoppingCart from "./components/ShoppingCart.jsx"; // Import ShoppingCart component
import SearchPage from "./components/SearchPage.jsx"; // Import SearchPage component
import { PlayerContext } from "./context/PlayerContext.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import CreatePlaylist from "./components/CreatePlaylist.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

export const url = "http://localhost:4000";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication state based on token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

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

        {/* Register Page Route */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Search Page Route */}
        <Route
          path="/search"
          element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" />}
        />

        {/* Create Playlist Route */}
        <Route
          path="/create-playlist"
          element={
            isAuthenticated ? <CreatePlaylist /> : <Navigate to="/login" />
          }
        />

        {/* Profile Page Route */}
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />

        {/* Shopping Cart Route */}
        <Route
          path="/cart"
          element={
            isAuthenticated ? <ShoppingCart /> : <Navigate to="/login" />
          }
        />

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
