import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    // color of sidebar fill is set to match the light blue main theme color
    // company logo is now changed to "SoundWave" with the same placement
    // TO DO: apply logo component from figma to the assets
   <div className="bg-[#06A0B5] min-h-screen pl-[4vw]">
     <h1 
  className="mt-5 w-[max(10vw,100px)] hidden sm:block text-center text-4xl font-bold"
>
  SoundWave
</h1>
      <div className="flex flex-col gap-5 mt-10">
        <NavLink
          to="/add-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium" //drop shadow set to black hex code
        >
          <img src={assets.add_song} className="w-5" alt="" />
          <p className="hidden sm:block">Add Song</p>
          <p className="sm:hidden"></p>
        </NavLink>

        <NavLink
          to="/list-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium" //drop shadow set to black hex code
        >
          <img src={assets.song_icon} className="w-5" alt="" />
          <p className="hidden sm:block">List Songs</p>
          <p className="sm:hidden"></p>
        </NavLink>

        <NavLink
          to="/add-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium" //drop shadow set to black hex code
        >
          <img src={assets.add_album} className="w-5" alt="" />
          <p className="hidden sm:block">Add Album</p>
          <p className="sm:hidden"></p>
        </NavLink>

        <NavLink
          to="/list-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#000000] cursor-pointer text-sm font-medium" //drop shadow set to black hex code
        >
          <img src={assets.album_icon} className="w-5" alt="" />
          <p className="hidden sm:block">List Album</p>
          <p className="sm:hidden"></p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
