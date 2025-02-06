import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/config'

function LogoutBtn() {

    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <div className="">
            <button
            className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-200'
            >Logout</button>
        </div>
    )
}

export default LogoutBtn
