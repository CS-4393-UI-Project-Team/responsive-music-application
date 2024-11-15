import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../App";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState("#121212");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColor", color);

      const response = await axios.post(`${url}/api/album/add`, formData);

      if (response.data.success) {
        toast.success("Album added successfully");
        setName("");
        setDesc("");
        setImage(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occured");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className="w-24 cursor-pointer"
            alt=""
          />
        </label>
        <div className="flex flex-col gap-2.5">
          <p>Album Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
            type="text"
            placeholder="Type here"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <p>Album Description</p>
          <input
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
            type="text"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          type="color"
        />
      </div>

      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;