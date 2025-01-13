import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../services/auth_service";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import axios from "axios";
import { FiMenu, FiX, FiHome, FiUser, FiLogOut, FiEdit, FiPlusCircle, FiBook, FiFileText } from 'react-icons/fi';

// Reusable Button Component with icon support
const Button = ({ children, onClick, className, type = "button", icon: Icon }) => (
  <button
    onClick={onClick}
    type={type}
    className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center gap-2 ${className}`}
  >
    {Icon && <Icon className="w-5 h-5" />}
    {children}
  </button>
);

const Dashboard = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((e) => {
        console.log(e);
      });
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No user data available. Please log in.</p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700"
            icon={FiLogOut}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center text-white font-bold">
                {userData.first_name?.[0] || userData.username?.[0]}
              </div>
              <span className="ml-3 font-semibold text-gray-800">
                {userData.first_name || userData.username}
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={() => navigate("/edit-profile")}
                className="bg-blue-600 hover:bg-blue-700"
                icon={FiEdit}
              >
                Edit Profile
              </Button>
              {/* {userData.is_staff && (
                <Button
                  onClick={() => handleFormToggle("blog")}
                  className="bg-green-600 hover:bg-green-700"
                  icon={FiPlusCircle}
                >
                  New Blog
                </Button>
              )} */}
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700"
                icon={FiLogOut}
              >
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {showMobileMenu ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 p-4">
            <div className="flex flex-col space-y-3">
              <Button
                onClick={() => navigate("/edit-profile")}
                className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                icon={FiEdit}
              >
                Edit Profile
              </Button>
              {userData.is_staff && (
                <Button
                  onClick={() => handleFormToggle("blog")}
                  className="w-full justify-center bg-green-600 hover:bg-green-700"
                  icon={FiPlusCircle}
                >
                  New Blog
                </Button>
              )}
              <Button
                onClick={handleLogout}
                className="w-full justify-center bg-red-600 hover:bg-red-700"
                icon={FiLogOut}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* User Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Information</h3>
            <div className="space-y-2">
              <p className="text-gray-600">Email: {userData.email}</p>
              <p className="text-gray-600">Username: {userData.username}</p>
              {userData.is_staff && (
                <p className="text-green-600 font-medium">Admin User</p>
              )}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
            <div className="space-y-4">
              {userData.is_staff && (
                <>
                  <Button
                    onClick={() => handleFormToggle("blog")}
                    className="w-full justify-center bg-green-600 hover:bg-green-700"
                    icon={FiBook}
                  >
                    Add Blog Post
                  </Button>
                  <Button
                    onClick={() => handleFormToggle("circular")}
                    className="w-full justify-center bg-indigo-600 hover:bg-indigo-700"
                    icon={FiFileText}
                  >
                    Add Circular
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add {formType === "blog" ? "Blog" : "Circular"}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Enter description"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    icon={FiPlusCircle}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
