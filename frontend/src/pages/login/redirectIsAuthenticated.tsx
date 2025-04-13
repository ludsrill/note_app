import { useContext } from "react"
import { AuthContext } from "../../context/Authcontext"
import { Navigate } from "react-router-dom"


const RedirectLogin = ({ children }) => {
  const { username } = useContext(AuthContext)

  if (username) {
    return <Navigate to="/list" replace />
  }
  return children

}
export default RedirectLogin