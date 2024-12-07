import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { url } from "../App";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  // Fetch albums from the server
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error("Error occurred while fetching albums");
    }
  };

  // Remove an album by ID
  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums(); // Refresh the album list after removing
      }
    } catch (error) {
      toast.error("Error occurred while removing album");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p className="text-2xl font-bold mb-4">All Albums List</p>
      <div>
        {/* Header row */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>

        {/* Albums list */}
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
          >
            <img
              className="w-12 h-12 object-cover"
              src={item.image}
              alt="Album"
            />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            {/* Read-only color input */}
            <input
              type="color"
              value={item.bgColor}
              readOnly // Ensures this is a read-only field
              className="w-12 h-12 cursor-pointer"
            />
            <p
              onClick={() => removeAlbum(item._id)}
              className="cursor-pointer text-red-500 font-bold hover:underline"
            >
              Remove
            </p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListAlbum;
