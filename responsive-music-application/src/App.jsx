import React, { useContext } from "react";
import Sidebar from "./components/sidebar.jsx";
import Player from "./components/player.jsx";
import Display from "./components/Display.jsx";
import DisplayHome from "./components/DisplayHome.jsx";
import LoginPage from "./components/login.jsx";
import SignupPage from "./components/signup.jsx";
import { PlayerContext } from "./context/PlayerContext.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/home" element={<DisplayHome />} />
        <Route
          path="/DisplayHome"
          element={
            songsData.length !== 0 ? (
              <>
                <div className="h-[90%] flex">
                  <Sidebar />
                  <Display />
                </div>
                <Player />
                <audio ref={audioRef} src={track ? track.file : ""} preload="auto"></audio>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                Loading songs...
              </div>
            )
          }
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
