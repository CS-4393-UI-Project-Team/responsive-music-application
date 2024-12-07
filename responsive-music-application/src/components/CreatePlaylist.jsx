import React, { useState, useContext, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import SongItem from "./SongItem";

import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../App"; // Import base API URL

const CreatePlaylist = () => {
  const { songsData, playlists, setPlaylists } = useContext(PlayerContext);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  // Fetch playlists from the backend
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}/api/playlists/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setPlaylists(response.data.playlists);
        } else {
          toast.error("Failed to fetch playlists.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching playlists.");
      }
    };

    fetchPlaylists();
  }, [setPlaylists]);

  // Handle creating a playlist
  const handleCreatePlaylist = async () => {
    if (!playlistName.trim()) {
      toast.error("Please enter a playlist name.");
      return;
    }

    if (!selectedSongs.length) {
      toast.error("Please select at least one song.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/playlists/add`,
        { name: playlistName, songs: selectedSongs.map((song) => song._id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setPlaylists((prevPlaylists) => [
          ...prevPlaylists,
          response.data.playlist,
        ]);
        setPlaylistName("");
        setSelectedSongs([]);
        toast.success("Playlist created successfully!");
      } else {
        toast.error("Failed to create playlist.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the playlist.");
    }
  };

  // Handle song selection
  const handleSongSelection = (song) => {
    setSelectedSongs((prevSelected) =>
      prevSelected.includes(song)
        ? prevSelected.filter((s) => s !== song)
        : [...prevSelected, song]
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <NavBar />

        <div className="flex-grow p-6 overflow-y-auto">
          <ToastContainer />
          <div className="max-w-6xl mx-auto bg-[#242424] rounded-lg p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-center">
              Create Playlist
            </h1>

            {/* Input for Playlist Name */}
            <div className="mb-6">
              <label
                htmlFor="playlistName"
                className="block text-lg font-semibold mb-2"
              >
                Playlist Name
              </label>
              <input
                id="playlistName"
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter playlist name"
                className="w-full p-3 bg-[#2b2b2b] rounded-lg text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#06A0B5]"
              />
            </div>

            {/* Song Selection */}
            <h2 className="text-2xl font-bold mb-4">Add Songs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {songsData.map((song) => (
                <div
                  key={song._id}
                  onClick={() => handleSongSelection(song)}
                  className={`relative p-4 bg-[#2b2b2b] rounded-lg cursor-pointer hover:shadow-lg transition ${
                    selectedSongs.includes(song)
                      ? "border-4 border-[#06A0B5]"
                      : ""
                  }`}
                >
                  <SongItem
                    name={song.name}
                    desc={song.desc}
                    id={song._id}
                    image={song.image}
                  />
                  {selectedSongs.includes(song) && (
                    <span className="absolute top-2 right-2 bg-[#06A0B5] text-xs font-bold px-2 py-1 rounded">
                      Selected
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Create Playlist Button */}
            <div className="text-center">
              <button
                onClick={handleCreatePlaylist}
                className="px-8 py-3 bg-[#06A0B5] text-lg font-bold rounded-full hover:bg-[#048E9B] transition"
              >
                Create Playlist
              </button>
            </div>

            {/* Existing Playlists */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Your Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  className="bg-[#2b2b2b] rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold">{playlist.name}</h3>
                  <p className="text-sm text-gray-400">
                    {playlist.songs.length} songs
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;
