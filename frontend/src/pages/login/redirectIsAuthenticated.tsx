import { ReactElement, useContext } from 'react'
import { AuthContext } from '../../context/Authcontext'
import { Navigate } from 'react-router-dom'

const RedirectLogin = ({ children }): ReactElement => {
  const { username } = useContext(AuthContext)

  if (username !== null) {
    return <Navigate to='/list' replace />
  }
  return children
}

const RedirectNoLogin = ({ children }): ReactElement => {
  const { username } = useContext(AuthContext)

  if (username === null) {
    return <Navigate to='/' replace />
  }
  return children
}
export {
  RedirectLogin,
  RedirectNoLogin
}
