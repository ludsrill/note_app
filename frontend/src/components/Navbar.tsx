import { useContext } from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { LuLogOut } from "react-icons/lu";

const NavBar = () => {
  const { username, dispatch } = useContext(AuthContext)
  const path = window.location.href.split("/")
  const isLogin = path ? path.pop() === "login" : false
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch({ "type": "LOGOUT" })
  }
  const handleLogin = () => {
    navigate("/login")
  }

  return (
    !isLogin ? (
      <div className="flex justify-between items-center p-4 bg-neutral-200 shadow-md">
        <nav className="flex space-x-4 ml-4">
          <Link to="/" className="text-gray-700 hover:underline">
            Home
          </Link>
          <Link to="/add-task" className="text-gray-700 hover:underline">
            Add Task
          </Link>
        </nav>
        {username ? (
          <div className="flex mr-4 items-center">
            <div className="text-md text-gray-700 font-semibold mr-2">
              {username}
            </div>
            <button onClick={handleLogout}><LuLogOut /></button>
          </div>
        ) : <div className="flex items-center  mr-4">
          <button className="flex items-center text-md text-gray-700 font-semibold mr-1" onClick={handleLogin}>
            Login
          </button>

        </div>
        }

      </div>
    ) : null
  )
}


export default NavBar