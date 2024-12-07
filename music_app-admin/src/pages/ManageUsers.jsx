import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/users/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Remove user
  const removeUser = async (id) => {
    try {
      await axios.post(`${url}/api/users/remove`, { id });
      toast.success("User removed successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Error removing user");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Manage Users</h2>
      <div className="grid grid-cols-1 gap-4 my-4">
        {users.map((user) => (
          <div key={user._id} className="bg-gray-800 p-4 rounded text-white">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <button
              onClick={() => removeUser(user._id)}
              className="mt-2 px-4 py-2 bg-red-500 rounded"
            >
              Remove User
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageUsers;
