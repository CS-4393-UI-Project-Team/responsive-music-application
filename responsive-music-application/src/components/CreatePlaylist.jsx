import React, { useState, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import SongItem from "./SongItem";

const CreatePlaylist = () => {
  const { songsData, playlists, setPlaylists } = useContext(PlayerContext);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleCreatePlaylist = () => {
    if (playlistName.trim() === "") {
      alert("Please enter a playlist name.");
      return;
    }

    const newPlaylist = {
      id: Date.now(),
      name: playlistName,
      songs: selectedSongs,
    };

    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    setPlaylistName("");
    setSelectedSongs([]);
    alert("Playlist created successfully!");
  };

  const handleSongSelection = (song) => {
    if (selectedSongs.includes(song)) {
      setSelectedSongs((prevSelected) =>
        prevSelected.filter((selectedSong) => selectedSong !== song)
      );
    } else {
      setSelectedSongs((prevSelected) => [...prevSelected, song]);
    }
  };

  return (
    <div className="p-6 h-screen bg-[#121212] text-white">
      <h1 className="text-3xl font-bold mb-6">Create a New Playlist</h1>

      {/* Input for Playlist Name */}
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Enter playlist name"
        className="w-full p-3 text-lg bg-[#2b2b2b] rounded-lg text-white mb-6 outline-none placeholder-gray-400"
      />

      {/* Song Selection */}
      <h2 className="text-2xl font-bold text-[#06A0B5] mb-4">Add Songs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songsData.map((song, index) => (
          <div
            key={index}
            onClick={() => handleSongSelection(song)}
            className={`p-4 bg-[#242424] rounded-lg cursor-pointer ${
              selectedSongs.includes(song) ? "border-2 border-[#06A0B5]" : ""
            } transition-all`}
          >
            <SongItem
              key={index}
              name={song.name}
              desc={song.desc}
              id={song._id}
              image={song.image}
            />
          </div>
        ))}
      </div>

      {/* Create Playlist Button */}
      <button
        onClick={handleCreatePlaylist}
        className="mt-8 px-6 py-3 bg-[#06A0B5] text-white rounded-lg text-lg font-bold hover:bg-[#048E9B] transition-all"
      >
        Create Playlist
      </button>
    </div>
  );
};

export default CreatePlaylist;
