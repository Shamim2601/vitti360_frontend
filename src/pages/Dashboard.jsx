import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../services/auth_service";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import axios from "axios";
import { FiMenu, FiX, FiHome, FiUser, FiLogOut, FiEdit, FiPlusCircle, FiBook, FiFileText, FiTrash2, FiShare2 } from 'react-icons/fi';

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
    url: ""
  });
  const [users, setUsers] = useState([]);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showExamForm, setShowExamForm] = useState(false);
  const [examFormData, setExamFormData] = useState({
    title: "",
    duration: "",
    category: "",
    start_at: "",
    end_at: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
        explanation: ""
      }
    ]
  });
  const [exams, setExams] = useState([]);
  const [showExamsModal, setShowExamsModal] = useState(false);
  const [performanceResults, setPerformanceResults] = useState([]);

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
      const token = localStorage.getItem("token");
      await axios.post(`${conf.apiUrl}${endpoint}`, {
        ...formData,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert(`${formType === "blog" ? "Blog" : "Circular"} added successfully!`);
      setFormData({ title: "", category: "", description: "", url: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  const handleShowUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.get(`${conf.apiUrl}/auth/all_users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setShowUsersModal(true);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("Failed to load users");
    }
  };

  const handleShowExams = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${conf.apiUrl}/api/exams/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExams(response.data);
      setShowExamsModal(true);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
      alert("Failed to load exams");
    }
  };

  const handleDeleteExam = async (examId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${conf.apiUrl}/api/exams/${examId}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExams(exams.filter(exam => exam.id !== examId));
      alert("Exam deleted successfully!");
    } catch (error) {
      console.error("Failed to delete exam:", error);
      alert("Failed to delete exam. Please try again.");
    }
  };

  const handleExamFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...examFormData,
        questions: examFormData.questions.map((q, index) => ({
          id: index + 1,
          question_text: q.question,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation
        }))
      };

      // Conditionally include start_at and end_at
      if (!examFormData.start_at) {
        delete payload.start_at;
      }
      if (!examFormData.end_at) {
        delete payload.end_at;
      }

      await axios.post(`${conf.apiUrl}/api/exams/create/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert("Exam added successfully!");
      setShowExamForm(false);
      setExamFormData({
        title: "",
        duration: "",
        category: "",
        start_at: "",
        end_at: "",
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            answer: "",
            explanation: ""
          }
        ]
      });
    } catch (error) {
      console.error("Failed to create exam:", error);
      alert("Failed to create exam. Please try again.");
    }
  };

  const handleQuestionChange = (index, field, value) => {
    setExamFormData(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value
      };
      return { ...prev, questions: newQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setExamFormData(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].options[optionIndex] = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const addQuestion = () => {
    setExamFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          options: ["", "", "", ""],
          answer: "",
          explanation: ""
        }
      ]
    }));
  };

  const deleteQuestion = (indexToDelete) => {
    setExamFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== indexToDelete)
    }));
  };

  const fetchPerformanceResults = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${conf.apiUrl}/api/performances/?user=${userData.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPerformanceResults(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Failed to fetch performance results:", error);
    }
  };

  const handleShare = (result) => {
    const shareData = {
      title: `Exam Performance: ${result.exam_details.title}`,
      text: `Exam : ${result.exam_details.title} (Id-${result.examId})\n Score : ${result.correct_count} / ${result.exam_details.num_questions} in ${result.exam_duration} minutes `,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  const handleDeleteUser = async (username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${conf.apiUrl}/auth/delete/${username}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter(user => user.username !== username));
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert(error.response?.data?.message || "Failed to delete user. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (!userData.is_staff) {
      fetchPerformanceResults();
    }
  }, [userData]);

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
              {/* {userData.is_staff && (
                <Button
                  onClick={() => handleFormToggle("blog")}
                  className="w-full justify-center bg-green-600 hover:bg-green-700"
                  icon={FiPlusCircle}
                >
                  New Blog
                </Button>
              )} */}
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
              {userData.is_staff ? (
                <>
                  <Button
                    onClick={handleShowUsers}
                    className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                    icon={FiUser}
                  >
                    Show All Users
                  </Button>
                  <Button
                    onClick={handleShowExams}
                    className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                    icon={FiBook}
                  >
                    Show All Exams
                  </Button>
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
                  <Button
                    onClick={() => setShowExamForm(true)}
                    className="w-full justify-center bg-purple-600 hover:bg-purple-700"
                    icon={FiBook}
                  >
                    Add New Exam
                  </Button>
                </>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance Results</h3>
                  <div className="space-y-4">
                    {performanceResults.map((result) => (
                      <div key={result.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="text-lg font-medium text-gray-800">{result.exam_details.title}</h4>
                        <p className="text-gray-600">Category: {result.exam_details.category}</p>
                        <p className="text-gray-600">Created At: {new Date(result.exam_details.created_at).toLocaleString()}</p>
                        <p className="text-gray-600">Time Taken: {result.exam_duration} / {result.exam_details.duration} minutes</p>
                        <p className="text-gray-600">Score: {result.correct_count} / {result.exam_details.num_questions}</p>
                        <p className="text-gray-600">Accuracy: {((result.correct_count / result.exam_details.num_questions) * 100).toFixed(2)}%</p>
                        <button
                          onClick={() => handleShare(result)}
                          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                          <FiShare2 /> Share
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Users Modal */}
        {showUsersModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  All Users
                </h3>
                <button
                  onClick={() => setShowUsersModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {users.map((user) => (
                  <div key={user.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">
                          {user.first_name || user.username}
                        </h4>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">Username: {user.username}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {user.is_staff && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Admin
                          </span>
                        )}
                        {!user.is_staff && ( // Only show delete button for non-admin users
                          <button
                            onClick={() => handleDeleteUser(user.username)}
                            className="text-red-500 hover:text-red-700 flex items-center gap-2"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Exams Modal */}
        {showExamsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  All Exams
                </h3>
                <button
                  onClick={() => setShowExamsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {exams.map((exam) => (
                  <div key={exam.id} className="py-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-medium text-gray-800">
                        {exam.title}
                      </h4>
                      <p className="text-gray-600">Category: {exam.category}</p>
                      <p className="text-gray-600">Duration: {exam.duration} minutes</p>
                    </div>
                    <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-2"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
                <div>
                  <label className="block text-gray-700 mb-2">URL</label>
                  <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter URL"
                    required
                  />
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

        {/* Exam Form Modal */}
        {showExamForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Create New Exam</h3>
                <button
                  onClick={() => setShowExamForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleExamFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={examFormData.title}
                      onChange={(e) => setExamFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Duration (minutes)</label>
                    <input
                      type="number"
                      value={examFormData.duration}
                      onChange={(e) => setExamFormData(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      value={examFormData.category}
                      onChange={(e) => setExamFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Start At</label>
                    <input
                      type="datetime-local"
                      value={examFormData.start_at}
                      onChange={(e) => setExamFormData(prev => ({ ...prev, start_at: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">End At</label>
                    <input
                      type="datetime-local"
                      value={examFormData.end_at}
                      onChange={(e) => setExamFormData(prev => ({ ...prev, end_at: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                {examFormData.questions.map((question, qIndex) => (
                  <div key={qIndex} className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Question {qIndex + 1}</h4>
                      {examFormData.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteQuestion(qIndex)}
                          className="text-red-500 hover:text-red-700 flex items-center gap-2"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Question Text</label>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex}>
                            <label className="block text-gray-700 mb-2">Option {oIndex + 1}</label>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg"
                              required
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Correct Answer</label>
                        <select
                          value={question.answer}
                          onChange={(e) => handleQuestionChange(qIndex, 'answer', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg"
                          required
                        >
                          <option value="">Select correct answer</option>
                          {question.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Explanation</label>
                        <textarea
                          value={question.explanation}
                          onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg"
                          rows="2"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={addQuestion}
                    className="text-sm px-4 py-1.5 bg-green-600 hover:bg-green-700"
                    icon={FiPlusCircle}
                  >
                    Add Question
                  </Button>
                  <div className="space-x-4">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create Exam
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowExamForm(false)}
                      className="bg-gray-600 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
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
