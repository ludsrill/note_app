import { useReducer, createContext, useEffect } from "react";
import { getToken } from "../utils/utils";

const initialState = {
  username: JSON.parse(localStorage.getItem("username")) || null
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { username: action.payload }
    case "LOGOUT":
      return { username: null }
    default:
      return state
  }
}


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  useEffect(() => {
    if (state.username) {
      localStorage.setItem("username", JSON.stringify(state.username))
    }
    else {
      localStorage.removeItem("username")
    }
  }, [state.username])

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tasks/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
          }
        })

        if (!response.ok) {
          dispatch({ type: "LOGOUT" })
          localStorage.removeItem("username")

        }
      }
      catch (error) {
        dispatch({ type: "LOGOUT" })
        localStorage.removeItem("username")
      }
    }
    fetching()
    const interval = setInterval(fetching, 300000)
    return () => clearInterval(interval)

  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>)
}