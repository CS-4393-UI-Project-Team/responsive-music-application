// src/components/Sidebar.jsx

import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[25%] h-full p-4 flex flex-col gap-4 text-white hidden lg:flex bg-[#121212]">
      {/* Header Section */}
      <div className="h-[15%] rounded flex flex-col justify-around">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-6 cursor-pointer hover:bg-[#1f1f1f] hover:rounded p-3 transition"
        >
          <img className="w-6" src={assets.home_icon} alt="Home Icon" />
          <p className="font-bold">Home</p>
        </div>
        <div
          onClick={() => navigate("/search")}
          className="flex items-center gap-3 pl-6 cursor-pointer hover:bg-[#1f1f1f] hover:rounded p-3 transition"
        >
          <img className="w-6" src={assets.search_icon} alt="Search Icon" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      {/* Library Section */}
      <div className="bg-[#1b1b1b] h-[85%] rounded mt-4">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="Library Icon" />
            <p className="font-semibold">Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img
              className="w-5 cursor-pointer hover:text-[#06A0B5] transition"
              src={assets.arrow_icon}
              alt="Expand Icon"
            />
            <img
              className="w-5 cursor-pointer hover:text-[#06A0B5] transition"
              src={assets.plus_icon}
              alt="Add Icon"
            />
          </div>
        </div>

        {/* Create Playlist Section */}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1 className="text-white">Create Your Playlist</h1>
          <p className="font-light text-gray-400">It's easy and free!</p>
          <button className="px-4 py-1.5 bg-[#06A0B5] text-[15px] text-white rounded-full mt-4 transition hover:bg-[#048E9B]">
            Create Playlist
          </button>
        </div>

        {/* Find a Podcast Section */}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1 className="text-white">Find a New Podcast</h1>
          <p className="font-light text-gray-400">
            Stay up to date on new episodes
          </p>
          <button className="px-4 py-1.5 bg-[#06A0B5] text-[15px] text-white rounded-full mt-4 transition hover:bg-[#048E9B]">
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
