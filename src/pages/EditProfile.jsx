import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/authSlice';
import Button from '../components/Button';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const [formData, setFormData] = useState({
        first_name: userData.first_name || '',
        email: userData.email || '',
        username: userData.username || '',
        password: '', // Add password field
    });
    const [showPassword, setShowPassword] = useState(false); // Add state for showing password

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(formData));
        navigate('/dashboard');
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone number</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                </Button>
            </form>
        </div>
    );
};

export default EditProfile;