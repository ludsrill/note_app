import { useContext } from "react";
import { NavLink as Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

const NavBar = () => {
  const { username } = useContext(AuthContext)
  return (
    <div className="flex justify-between items-center p-4 bg-neutral-200 shadow-md">
      <nav className="flex space-x-4">
        <Link to="/" className="text-gray-700 hover:underline">
          Home
        </Link>
        <Link to="/add-task" className="text-gray-700 hover:underline">
          Add Task
        </Link>
        <Link to="/registration" className="text-gray-700 hover:underline">
          Registration
        </Link>
        <Link to="/login" className="text-gray-700 hover:underline">
          Login
        </Link>
      </nav>
      {username && (
        <div className="text-sm text-gray-700 font-semibold">
          {username}
        </div>
      )}
    </div>
  )
}

export default NavBar