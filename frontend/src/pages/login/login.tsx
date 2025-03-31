import { useForm } from "react-hook-form"
import { getCsrfToken } from "../../utils/utils"
import { useContext } from "react"
import { AuthContext } from "../../context/Authcontext"
export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const { username, dispatch } = useContext(AuthContext)

  const onSubmit = handleSubmit((data) => {
    fetch("http://localhost:8000/user/login/", {
      method: "POST",
      headers: {
        "X-CSRFToken": getCsrfToken(),
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        "username": data["username"],
        "password": data["password"]
      })
    }).then(() => dispatch({ type: "LOGIN", payload: data["username"] }))

  })

  return (
    <>
      <h1>Login</h1>
      {username
        ? <h2>Logged user {username}</h2>
        : <h2>Logged user None</h2>}
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" {...register("username", {
          required: {
            value: true,
            message: "Username is required"
          }
        })} />

        <label htmlFor="password">
          Password
        </label>
        <input type="text" {...register("password", {
          required: {
            value: true,
            message: "Password required"
          }
        })} />
        <br />
        <button>Login</button>

      </form>
    </>

  )

}
