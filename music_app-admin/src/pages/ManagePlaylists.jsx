import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [editingPlaylistName, setEditingPlaylistName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch playlists
  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/playlists/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setPlaylists(response.data.playlists);
      } else {
        toast.error("Failed to fetch playlists");
      }
    } catch (error) {
      toast.error("Error fetching playlists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  // Add playlist
  const addPlaylist = async () => {
    if (!newPlaylistName) {
      toast.error("Please enter a playlist name");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/playlists/add`,
        { name: newPlaylistName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Playlist added successfully");
        fetchPlaylists();
        setNewPlaylistName("");
      } else {
        toast.error("Failed to add playlist");
      }
    } catch (error) {
      toast.error("Error adding playlist");
    }
  };

  // Remove playlist
  const removePlaylist = async (id) => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/playlists/remove`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Playlist removed successfully");
        fetchPlaylists();
      } else {
        toast.error("Failed to remove playlist");
      }
    } catch (error) {
      toast.error("Error removing playlist");
    }
  };

  // Edit playlist name
  const editPlaylistName = async (id, newName) => {
    if (!newName) {
      toast.error("Please enter a valid playlist name");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/playlists/edit`,
        { id, newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Playlist name updated successfully");
        fetchPlaylists();
        setEditingPlaylistId(null);
        setEditingPlaylistName("");
      } else {
        toast.error("Failed to update playlist name");
      }
    } catch (error) {
      toast.error("Error updating playlist name");
    }
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Manage Playlists</h2>
      <div className="my-4">
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="Enter new playlist name"
          className="p-2 mr-2 border rounded"
        />
        <button
          onClick={addPlaylist}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Playlist
        </button>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search playlists..."
        className="p-2 mb-4 border rounded"
      />
      {loading ? (
        <div className="text-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredPlaylists.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-gray-800 p-4 rounded text-white"
            >
              {editingPlaylistId === playlist._id ? (
                <div>
                  <input
                    type="text"
                    value={editingPlaylistName}
                    onChange={(e) => setEditingPlaylistName(e.target.value)}
                    className="p-2 text-black rounded"
                  />
                  <button
                    onClick={() =>
                      editPlaylistName(playlist._id, editingPlaylistName)
                    }
                    className="mt-2 px-4 py-2 bg-green-500 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <h3 className="font-semibold">{playlist.name}</h3>
              )}
              <button
                onClick={() => {
                  setEditingPlaylistId(playlist._id);
                  setEditingPlaylistName(playlist.name);
                }}
                className="mt-2 px-4 py-2 bg-yellow-500 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => removePlaylist(playlist._id)}
                className="mt-2 px-4 py-2 bg-red-500 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ManagePlaylists;
