// src/components/DisplayHome.jsx

import React from "react";
import NavBar from "./NavBar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      <NavBar />
      {/* Featured Albums Section */}
      <div className="mb-12 mx-4">
        <h1 className="my-1 font-bold text-2xl text-[#06A0B5]">
          Featured Albums
        </h1>
        <div className="flex overflow-x-auto gap-6">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* Current Top Hits Section */}
      <div className="mb-8 mx-4">
        <h1 className="my-5 font-bold text-2xl text-[#06A0B5]">
          Current Top Hits
        </h1>
        <div className="flex overflow-x-auto gap-6">
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
