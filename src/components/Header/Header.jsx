import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container,Logo, LogoutBtn } from '../index'
import { useNavigate } from 'react-router-dom'

function Header() {

    const useStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slag : '/',
            active: true
        },
        {
            name : 'Login',
            slag : '/login',
            active: !authStatus
        },
        {
            name : 'Signup',
            slag : '/signup',
            active: !authStatus
        },
        {
            name : 'All Posts',
            slag : '/all-posts',
            active: authStatus
        },
        {
            name : 'Add Post',
            slag : '/add-post',
            active: authStatus
        }
    ]

    return (
        <header className='py-4 bg-gray-500 shadow text-white'>
            <Container>
                <nav className="flex">
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {
                            navItems.map((item) => 
                            item.active ? (
                                <li key={item.name} className='mr-4'>
                                    <button
                                    className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-200'
                                    onClick={() => navigate(item.slag)}
                                    >{item.name}</button>
                                </li>
                            ) : null
                            )
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
