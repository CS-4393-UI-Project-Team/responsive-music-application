import React, { useContext } from "react";
import Sidebar from "./components/sidebar.jsx";
import Player from "./components/player.jsx";
import Display from "./components/Display.jsx";
import LoginPage from "./components/login.jsx";
import { PlayerContext } from "./context/PlayerContext.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      <Routes>
        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main Application Route */}
        <Route
          path="/"
          element={
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
              <Navigate to="/login" /> // Redirect to login if no songs data
            )
          }
        />

        {/* Catch-all Route (Optional) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
