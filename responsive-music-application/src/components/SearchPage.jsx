import React, { useState, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

const SearchPage = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ songs: [], albums: [] });

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults({ songs: [], albums: [] });
      return;
    }

    // Filter songs and albums based on search query
    const filteredSongs = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(query) ||
        song.artist?.toLowerCase().includes(query)
    );

    const filteredAlbums = albumsData.filter(
      (album) =>
        album.name.toLowerCase().includes(query) ||
        album.desc?.toLowerCase().includes(query)
    );

    setSearchResults({ songs: filteredSongs, albums: filteredAlbums });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col bg-[#121212] text-white">
        {/* Search Input and Results */}
        <div className="p-6 overflow-auto">
          {/* Search Input */}
          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for songs, albums, artists..."
              className="w-full p-3 text-lg bg-[#2b2b2b] rounded-lg text-white outline-none placeholder-gray-400"
            />
          </div>

          {/* Display Search Results */}
          {searchQuery && (
            <div className="space-y-8">
              {/* Songs Results */}
              {searchResults.songs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#06A0B5]">Songs</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {searchResults.songs.map((song) => (
                      <SongItem
                        key={song._id}
                        name={song.name}
                        desc={song.desc}
                        id={song._id}
                        image={song.image}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Albums Results */}
              {searchResults.albums.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#06A0B5]">Albums</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {searchResults.albums.map((album) => (
                      <AlbumItem
                        key={album._id}
                        name={album.name}
                        desc={album.desc}
                        id={album._id}
                        image={album.image}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Found */}
              {searchResults.songs.length === 0 &&
                searchResults.albums.length === 0 && (
                  <p className="text-gray-400">
                    No results found for "
                    <span className="font-bold">{searchQuery}</span>".
                  </p>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
