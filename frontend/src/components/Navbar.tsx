import { useContext } from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import { LuLogOut } from 'react-icons/lu'

const NavBar = () => {
  const { username, dispatch } = useContext(AuthContext)
  const path = window.location.href.split('/')
  const currentPath = path.pop()
  const isLogin = currentPath === 'login'
  const isList = currentPath === 'list'
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  const handleLogin = () => {
    navigate('/login')
  }

  return (
    !isLogin
      ? (
        <div className='flex items-center justify-between py-4 bg-sky-600 shadow-md w-full'>

          {!isList
            ? <nav className='flex space-x-4 ml-8'>
              <Link to='/list' className='text-white hover:underline'>
                Home
              </Link>
              </nav>
            : null}

          {username
            ? (
              <div className='flex items-center ml-auto mr-8'>
                <div className='text-md text-white font-semibold mr-2'>
                  {username}
                </div>
                <button onClick={handleLogout}><LuLogOut color='white' /></button>
              </div>
              )
            : <div className='flex items-center ml-auto mr-8'>
              <button className='flex items-center text-md text-white font-semibold mr-1' onClick={handleLogin}>
                Login
              </button>

              </div>}

        </div>
        )
      : null
  )
}

export default NavBar
