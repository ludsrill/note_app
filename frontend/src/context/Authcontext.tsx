import { useReducer, createContext, useEffect, ReactElement } from 'react'

interface State {
  username: string | null
}

const initialState: State = {
  username: localStorage.getItem('username') !== null
    ? JSON.parse(localStorage.getItem('username'))
    : null
}

export const authReducer = (state, action): State => {
  switch (action.type) {
    case 'LOGIN':
      return { username: action.payload }
    case 'LOGOUT':
      document.cookie = 'task_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      window.location.reload()
      return { username: null }
    default:
      return state
  }
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }): ReactElement => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  useEffect(() => {
    if (state.username !== null) {
      localStorage.setItem('username', JSON.stringify(state.username))
    } else {
      localStorage.removeItem('username')
    }
  }, [state.username])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
