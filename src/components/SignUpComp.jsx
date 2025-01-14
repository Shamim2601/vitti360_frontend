import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from "./index"
import { useDispatch } from "react-redux"
import authService from "../services/auth_service"
import { useForm } from "react-hook-form"
import logo from '/favicon.ico'
import { FiAlertCircle, FiLoader } from 'react-icons/fi'

function SignUpComp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const signUp = async (data) => {
        setLoading(true)
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                reset() // Clear form
                // Show success message before redirecting
                const successMessage = document.getElementById('success-message')
                if (successMessage) {
                    successMessage.classList.remove('hidden')
                    setTimeout(() => {
                        navigate("/login")
                    }, 2000)
                }
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message)
            } else if (error.response?.data?.username) {
                setError("This phone number is already registered")
            } else if (error.response?.data?.email) {
                setError("This email is already registered")
            } else {
                setError("Registration failed. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center">
                        <img src={logo} alt="logo" className='w-16 h-16' />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Login here
                        </Link>
                    </p>
                </div>

                {/* Success Message */}
                <div id="success-message" className="hidden">
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <p className="font-medium">Registration successful! Redirecting to login...</p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center gap-2" role="alert">
                        <FiAlertCircle className="w-5 h-5" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(signUp)}>
                    <div className="space-y-6">
                        <div>
                            <Input
                                label={<span>Name <span className="text-red-500">*</span></span>}
                                placeholder="Enter your name"
                                type="text"
                                {...register("first_name", { 
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters"
                                    }
                                })}
                            />
                            {errors.first_name && (
                                <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    validate: {
                                        matchPattern: (value) =>
                                            value === "" || 
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Please enter a valid email address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                label={<span>Phone Number <span className="text-red-500">*</span></span>}
                                placeholder="Enter 11-digit phone number starting with 0"
                                type="text"
                                {...register("username", {
                                    required: "Phone number is required",
                                    validate: {
                                        isValidPhoneNumber: (value) => 
                                            /^0\d{10}$/.test(value) || 
                                            "Please enter a valid 11-digit phone number starting with 0"
                                    }
                                })}
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                label={<span>Password <span className="text-red-500">*</span></span>}
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}

                            <div className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id="show-password"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                />
                                <label htmlFor="show-password" className="ml-2 text-sm text-gray-600">
                                    Show password
                                </label>
                            </div>
                        </div>
                        
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <FiLoader className="w-5 h-5 animate-spin" />
                                    Creating Account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpComp
