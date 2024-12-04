import React, { useContext } from "react";
import Sidebar from "./components/sidebar.jsx";
import Player from "./components/player.jsx";
import Display from "./components/Display.jsx";
import LoginPage from "./components/login.jsx";
import { PlayerContext } from "./context/PlayerContext.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen bg-black">
      <Routes>
        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main Application Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              songsData.length !== 0 ? (
                <>
                  <div className="h-[90%] flex">
                    <Sidebar />
                    <Display />
                  </div>
                  <Player />
                  <audio
                    ref={audioRef}
                    src={track ? track.file : ""}
                    preload="auto"
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
        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
