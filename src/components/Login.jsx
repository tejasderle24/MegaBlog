import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/config';
import { login as authLogin } from '../store/authSlice'
import { Link } from 'react-router-dom';
import { Button,Logo,Input } from './index';


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState();

    const Login = async (data) => {
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
                <span>
                    <Logo />
                </span>
            </div>

        </div>
    )
}

export default Login
