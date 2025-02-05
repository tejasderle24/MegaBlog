import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService  from './appwrite/auth';
import { Login, Logout } from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';



function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(Login({userData}))
      } else {
        dispatch(Logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400 '>
      <div className='w-full block'>
        <Header />
        <main>
          TODO {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App
