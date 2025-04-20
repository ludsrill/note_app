import { ReactElement, useContext } from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import { LuLogOut } from 'react-icons/lu'

const NavBar = (): ReactElement | null => {
  const { username, dispatch } = useContext(AuthContext)
  const path = window.location.href.split('/')
  const currentPath = path.pop()
  const isLogin = currentPath === 'login'
  const isList = currentPath === 'list'
  const navigate = useNavigate()
  const handleLogout = (): void => {
    dispatch({ type: 'LOGOUT' })
  }
  const handleLogin = async (): Promise<void> => {
    await navigate('/login')
  }

  return (
    isLogin
      ? null
      : (
        <div className='flex items-center justify-between py-4 bg-sky-600 shadow-md w-full'>

          {isList
            ? null
            : (
              <nav className='flex space-x-4 ml-8'>
                <Link to='/list' className='text-white hover:underline'>
                  Home
                </Link>
              </nav>)}

          {username !== null
            ? (
              <div className='flex items-center ml-auto mr-8'>
                <div className='text-md text-white font-semibold mr-2'>
                  {username}
                </div>
                <button onClick={handleLogout}><LuLogOut color='white' />
                </button>
              </div>
              )
            : (
              <div className='flex items-center ml-auto mr-8'>
                <button className='flex items-center text-md text-white font-semibold mr-1' onClick={() => { handleLogin().catch(() => { }) }}>
                  Login
                </button>
              </div>
              )}
        </div>
        )
  )
}

export default NavBar
