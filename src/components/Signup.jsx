import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const [register, handleSubmit] = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount()
            if (userData) {
                const useData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto m-full max-w-lg bg-gray-100 p-10 rounded-xl border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2
                    className='text-center text-2xl font-bold leading-tight'
                >SignUp to Create Account</h2>
                <p>
                    Already has a account?&nbsp;
                    <Link
                        to={"/login"}
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p
                    className='bg-red-600 mt-6 text-center'
                >{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            lable="Full Name : "
                            placeholder="Enter your Full name"
                            {...register("name", {
                                require: true
                            })}
                        />
                        <Input
                            lable="Email : "
                            placeholder="Enter your Email "
                            type="email"
                            {...register("email", {
                                require: true,
                                validate: {
                                    matchpatern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Email address must be valid address ",
                                }
                            })}
                        />
                        <Input
                            lable="Password"
                            placeholder="Enter the Password"
                            type="password"
                            {...register("password", {
                                require: true
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Create Account</Button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Signup
