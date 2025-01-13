import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import authService from "../services/auth_service";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import axios from "axios";

// Reusable Button Component
const Button = ({ children, onClick, className, type = "button" }) => (
  <button
    onClick={onClick}
    type={type}
    className={`px-6 py-2 rounded-lg text-white font-medium ${className}`}
  >
    {children}
  </button>
);

const Dashboard = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFormToggle = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const endpoint = formType === "blog" ? "/api/blogs" : "/api/circulars";

    try {
      await axios.post(`${conf.apiUrl}${endpoint}`, {
        ...formData,
      });
      alert(`${formType === "blog" ? "Blog" : "Circular"} added successfully!`);
      setFormData({ title: "", category: "", description: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No user data available. Please log in.</p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Welcome to Your Dashboard
        </h1>
        <div className="flex flex-col items-center space-y-6">
          {/* User Info */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center text-2xl font-bold text-white mb-4">
              {userData.first_name?.[0] || userData.username?.[0]}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {userData.first_name || userData.username}
            </h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-600">Username: {userData.username}</p>
          </div>

          {/* User Actions */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => navigate("/edit-profile")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              Logout
            </Button>
          </div>

          {/* Staff Actions */}
          {userData.is_staff && (
            <div className="w-full border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Staff Actions
              </h3>
              <div className="flex space-x-4 justify-center">
                <Button
                  onClick={() => handleFormToggle("blog")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Add Blog
                </Button>
                <Button
                  onClick={() => handleFormToggle("circular")}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Circular
                </Button>
              </div>
            </div>
          )}

          {/* Add Blog/Circular Form */}
          {showForm && (
            <div className="w-full max-w-md bg-gray-50 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Add {formType === "blog" ? "Blog" : "Circular"}
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter category"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="4"
                    placeholder="Enter description"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={() => setShowForm(false)}
                    className="bg-gray-600 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
