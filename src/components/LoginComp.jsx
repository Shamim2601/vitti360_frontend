import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from "./index"
import { useDispatch } from "react-redux"
import authService from "../services/auth_service"
import { useForm } from "react-hook-form"
import logo from '/favicon.ico'

function LoginComp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        setError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData){
                    dispatch(authLogin({userData}));
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
            alert(error.message) // Show error as alert
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px] text-center">
                        <img src={logo} alt="logo" className=' w-12' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Phone: "
                            placeholder="ফোন নাম্বার (11 digits)"
                            type="text"
                            {...register("username", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Password: "
                            placeholder="পাসওয়ার্ড"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type='submit' className='w-full bg-slate-600' disabled={loading}>
                            {loading ? "Logging In..." : "Login"}
                        </Button>

                        <a href="/support" className="mt-4 block text-right text-sm text-blue-500 hover:underline"><h6>Forgot password?</h6></a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComp
