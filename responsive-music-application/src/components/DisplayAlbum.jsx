import React, { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    const foundAlbum = albumsData.find((item) => item._id === id);
    setAlbumData(foundAlbum);
  }, [id, albumsData]);

  // Filter the songs that belong to this album
  const albumSongs = songsData.filter(
    (item) =>
      item.album && item.album.toLowerCase() === albumData?.name.toLowerCase()
  );

  return albumData ? (
    <>
      <NavBar />
      <div className="bg-[#121212] min-h-screen p-6">
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end bg-[#121212] p-4 rounded-lg">
          <img
            className="w-48 rounded"
            src={albumData.image}
            alt={albumData.name}
          />
          <div className="flex flex-col text-white">
            <p className="text-sm">Playlist</p>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl">
              {albumData.name}
            </h2>
            <h4 className="text-md mb-2">{albumData.desc}</h4>
            <p className="mt-1 text-sm">
              <img
                className="inline-block w-5"
                src={assets.SoundWave_Logo}
                alt="SoundWave Logo"
              />
              <b>SoundWave</b> • {albumData.likes || "???"} likes •{" "}
              <b>{albumSongs.length} songs,</b> About{" "}
              {calculateTotalDuration(albumSongs)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] bg-[#121212] p-2 rounded-lg">
          <p>
            <b className="mr-4">#</b>Title
          </p>
          <p>Album</p>
          <p className="hidden sm:block">Date Added</p>
          <img
            className="m-auto w-4"
            src={assets.clock_icon}
            alt="Clock Icon"
          />
        </div>
        <hr />
        {albumSongs.map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer bg-[#121212]"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img
                className="inline w-10 mr-5"
                src={item.image}
                alt={item.name}
              />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
      </div>
    </>
  ) : null;
};

// Updated calculateTotalDuration to receive songs
const calculateTotalDuration = (songs) => {
  let totalSeconds = 0;

  songs.forEach((song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number);
    totalSeconds += minutes * 60 + seconds;
  });

  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours > 0 ? hours + "hr " : ""}${minutes}min`;
};

export default DisplayAlbum;
