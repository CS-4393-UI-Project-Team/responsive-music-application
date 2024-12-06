import express from "express";
import {
  addPlaylist,
  listPlaylists,
  removePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../controllers/playlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const playlistRouter = express.Router();

// All playlist routes are protected
playlistRouter.post("/add", protect, addPlaylist);
playlistRouter.get("/list", protect, listPlaylists);
playlistRouter.post("/remove", protect, removePlaylist);
playlistRouter.post("/add-song", protect, addSongToPlaylist);
playlistRouter.post("/remove-song", protect, removeSongFromPlaylist);

export default playlistRouter;
