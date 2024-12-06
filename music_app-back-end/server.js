// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";
import userRouter from "./src/routes/userRoute.js";
import playlistRouter from "./src/routes/playlistRoute.js"; // Import playlist routes

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(cors());
app.use(express.json());

//initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/users", userRouter);
app.use("/api/playlists", playlistRouter); // Initialize playlist routes

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
