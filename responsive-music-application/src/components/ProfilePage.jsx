import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // Import your asset path for icons and images
import Footer from "./Footer"; // Import Footer component
import { url } from "../App"; // Import base API URL
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [playlists, setPlaylists] = useState([]);

  const recentlyListened = [
    { id: 1, name: "Feel Good Inc.", artist: "Gorillaz", duration: "4:15" },
    { id: 2, name: "Let Loose", artist: "Richie Havens", duration: "4:09" },
    { id: 3, name: "No Time", artist: "Frank Ocean", duration: "2:47" },
    { id: 4, name: "Mr. Mudd", artist: "Travis Scott", duration: "5:04" },
  ];

  useEffect(() => {
    // Fetch user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
    }

    // Fetch playlists
    fetchPlaylists();
  }, []);

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

  return (
    <div className="flex min-h-screen flex-col">
      {/* Sidebar and Main content container */}
      <div className="flex flex-grow">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-grow bg-[#2c3e50] p-6 text-white overflow-y-auto flex flex-col">
          <ToastContainer />
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-32 h-32 bg-white rounded-full overflow-hidden">
              <img
                src={assets.profile_image} // Replace with a user's profile image if available
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">YOUR PROFILE</h1>
              <p className="text-3xl mt-2">{username}</p>
            </div>
          </div>

          {/* Recently listened to */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recently listened to</h2>
            <div className="flex flex-col gap-2">
              {recentlyListened.map((song) => (
                <div
                  key={song.id}
                  className="flex justify-between items-center bg-[#34495e] p-4 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <p className="text-xl font-semibold">{song.id}</p>
                    <div>
                      <p className="text-lg font-bold">{song.name}</p>
                      <p className="text-sm text-gray-300">{song.artist}</p>
                    </div>
                  </div>
                  <p className="text-lg">{song.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Playlists */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  className="bg-[#34495e] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/playlist/${playlist._id}`)}
                >
                  <div className="h-32 flex items-center justify-center bg-gray-700 text-gray-300">
                    <span className="text-xl font-bold">{playlist.name}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-400">
                      {playlist.songs.length} songs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
