import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from "./index"
import { useDispatch } from "react-redux"
import authService from "../services/auth_service"
import { useForm } from "react-hook-form"
import logo from '/favicon.ico'

function SignUpComp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const signUp = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                navigate("/login")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <img src={logo} alt="logo" className='w-12' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(signUp)}>
                    <div className='space-y-5'>
                        <Input
                            label={<span>Name <span className="text-red-500">*</span></span>}
                            placeholder="নাম"
                            type="text"
                            {...register("first_name", { required: "Name is required" })}
                        />
                        {errors.first_name && <p className="text-red-600">{errors.first_name.message}</p>}

                        <Input
                            label="Email"
                            placeholder="ইমেইল"
                            type="email"
                            {...register("email", {
                                validate: {
                                    matchPattern: (value) =>
                                        value === "" || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                        <Input
                            label={<span>Phone <span className="text-red-500">*</span></span>}
                            placeholder="ফোন নাম্বার (11 digits)"
                            type="text"
                            {...register("username", {
                                required: "Phone number is required",
                                validate: {
                                    isValidPhoneNumber: (value) => 
                                        /^0\d{10}$/.test(value) || "Phone number must be 11 digits, start with 0, and contain only numbers",
                                }
                            })}
                        />
                        {errors.username && <p className="text-red-600">{errors.username.message}</p>}

                        <div>
                            <Input
                                label={<span>Password <span className="text-red-500">*</span></span>}
                                placeholder="পাসওয়ার্ড"
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                            <div className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id="show-password"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    className="mr-2"
                                />
                                <label htmlFor="show-password" className="text-sm text-black/60">
                                    Show Password
                                </label>
                            </div>
                        </div>
                        
                        <Button type="submit" className='w-full bg-slate-600'>
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpComp
