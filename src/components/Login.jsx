import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/config';
import { login as authLogin } from '../store/authSlice'
import { Link } from 'react-router-dom';
import { Button, Logo, Input } from './index';


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState();

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)

        }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-block/10`}>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100px' />
                </span>
            </div>
            <h2
                className='text-center text-2xl font-bold leading-tight'
            >Sign In your Account</h2>
            <p>
                Dont&apos;t have any account?&nbsp;
                <Link
                    to={"/sign-up"}
                    className='font-medium text-primary transition-all duration-200 hover:underline'

                >
                    Sign Up
                </Link>
            </p>
            {error && <p
                className='bg-red-600 mt-6 text-center'
            >{error}</p>}

            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        type="email"
                        lable="Email : "
                        placeholder="Enter the Email"
                        {...register("email",
                            {
                                required: true,
                                validate: {
                                    matchpatern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Email address must be valid address ",

                                }
                            }
                        )}
                    />

                    <Input
                        type="password"
                        lable="Password : "
                        placeholder="Enter the Password"
                        {...register("password",
                            {
                                required: true
                            }
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                    >Sign-In</Button>
                </div>
            </form>

        </div>
    )
}

export default Login
