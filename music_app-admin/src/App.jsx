import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";

import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";
import ManagePlaylists from "./pages/ManagePlaylists";
import ManageUsers from "./pages/ManageUsers";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AdminLoginPage from "./components/AdminLoginPage"; // Import AdminLoginPage component

export const url = "http://localhost:4000";

const App = () => {
  const isAdmin = () => {
    const user = localStorage.getItem("user");
    return user && JSON.parse(user).isAdmin;
  };

  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar />

      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/login" element={<AdminLoginPage />} />
            {/* Protected Routes */}
            <Route
              path="/add-song"
              element={isAdmin() ? <AddSong /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/add-album"
              element={
                isAdmin() ? <AddAlbum /> : <Navigate to="/admin/login" />
              }
            />
            <Route
              path="/list-song"
              element={
                isAdmin() ? <ListSong /> : <Navigate to="/admin/login" />
              }
            />
            <Route
              path="/list-album"
              element={
                isAdmin() ? <ListAlbum /> : <Navigate to="/admin/login" />
              }
            />
            <Route
              path="/manage-playlists"
              element={
                isAdmin() ? <ManagePlaylists /> : <Navigate to="/admin/login" />
              }
            />
            <Route
              path="/manage-users"
              element={
                isAdmin() ? <ManageUsers /> : <Navigate to="/admin/login" />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
