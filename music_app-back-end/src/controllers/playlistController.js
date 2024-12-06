// src/controllers/playlistController.js

import playlistModel from "../models/playlistModel.js";
import songModel from "../models/songModel.js"; // Importing songModel to use for validation purposes

// Add a new playlist
const addPlaylist = async (req, res) => {
  try {
    const { name, songs } = req.body;

    // Validate playlist name
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Playlist name is required.",
      });
    }

    // Create a new playlist with the provided data using the authenticated user's ID
    const playlistData = {
      name,
      userId: req.user._id, // Use the authenticated user's ID
      songs: songs || [],
    };

    const playlist = new playlistModel(playlistData);
    await playlist.save();
    res.status(201).json({
      success: true,
      message: "Playlist added successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error adding playlist:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add playlist." });
  }
};

// List all playlists for the current user
const listPlaylists = async (req, res) => {
  try {
    const userId = req.user._id; // Use the authenticated user's ID
    const userPlaylists = await playlistModel
      .find({ userId })
      .populate("songs"); // Populate song details in playlists
    res.json({ success: true, playlists: userPlaylists });
  } catch (error) {
    console.error("Error listing playlists:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to list playlists." });
  }
};

// Remove a playlist by ID
const removePlaylist = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Playlist ID is required." });
    }

    // Only allow the owner of the playlist to delete it
    const playlist = await playlistModel.findById(id);
    if (!playlist || playlist.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found or unauthorized.",
      });
    }

    await playlistModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Playlist removed successfully" });
  } catch (error) {
    console.error("Error removing playlist:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove playlist." });
  }
};

// Add a song to a playlist
const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;

    if (!playlistId || !songId) {
      return res.status(400).json({
        success: false,
        message: "Playlist ID and Song ID are required.",
      });
    }

    // Find the playlist by ID and check if the user owns it
    const playlist = await playlistModel.findById(playlistId);
    if (!playlist || playlist.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found or unauthorized.",
      });
    }

    // Find the song by ID to ensure it exists
    const song = await songModel.findById(songId);
    if (!song) {
      return res
        .status(404)
        .json({ success: false, message: "Song not found." });
    }

    // Add song to the playlist if it doesn't already exist
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song already exists in the playlist.",
      });
    }

    playlist.songs.push(songId);
    await playlist.save();
    res.json({
      success: true,
      message: "Song added to playlist successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add song to playlist." });
  }
};

// Remove a song from a playlist
const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;

    // Validate required fields
    if (!playlistId || !songId) {
      return res.status(400).json({
        success: false,
        message: "Playlist ID and Song ID are required.",
      });
    }

    // Find the playlist by ID and ensure the user owns it
    const playlist = await playlistModel.findById(playlistId);
    if (!playlist || playlist.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found or unauthorized.",
      });
    }

    // Check if the song exists in the playlist
    if (!playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song not found in the playlist.",
      });
    }

    // Remove the song from the playlist's song array
    playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);

    // Save the updated playlist
    await playlist.save();

    res.json({
      success: true,
      message: "Song removed from playlist successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove song from playlist.",
    });
  }
};

// Add the new function to the exports
export {
  addPlaylist,
  listPlaylists,
  removePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};
