// src/components/Sidebar.jsx

import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#06A0B5] min-h-screen pl-[4vw]">
      <div className="flex items-center gap-2 mt-5">
        <img
          src={assets.SoundWave_Logo}
          alt="SoundWave Logo"
          className="w-[max(5vw,50px)] h-auto"
        />
        <h1 className="text-white text-3xl font-bold">SoundWave</h1>
      </div>
      <div className="flex flex-col gap-5 mt-10">
        <NavLink
          to="/add-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium"
        >
          <img src={assets.add_song} className="w-5" alt="Add Song Icon" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>
        <NavLink
          to="/list-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium"
        >
          <img src={assets.song_icon} className="w-5" alt="List Songs Icon" />
          <p className="hidden sm:block">List Songs</p>
        </NavLink>
        <NavLink
          to="/add-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium"
        >
          <img src={assets.add_album} className="w-5" alt="Add Album Icon" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>
        <NavLink
          to="/list-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium"
        >
          <img src={assets.album_icon} className="w-5" alt="List Albums Icon" />
          <p className="hidden sm:block">List Albums</p>
        </NavLink>
        <NavLink
          to="/manage-playlists"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium"
        >
          <img
            src={assets.album_icon}
            className="w-5"
            alt="Manage Playlist Icon"
          />
          <p className="hidden sm:block">Manage Playlists</p>
        </NavLink>
        <NavLink
          to="/manage-users"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium"
        >
          <img
            src={assets.SoundWave_Logo_Small}
            className="w-5"
            alt="Manage Users Icon"
          />
          <p className="hidden sm:block">Manage Users</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
