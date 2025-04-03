import { useForm } from "react-hook-form"
import { getCsrfToken } from "../../utils/utils"
import { useContext } from "react"
import { AuthContext } from "../../context/Authcontext"
import { getToken } from "../../utils/utils"
import { useNavigate } from "react-router-dom"


export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const { username, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    fetch("http://127.0.0.1:8000/user/login/", {
      method: "POST",
      headers: {
        "X-CSRFToken": getCsrfToken(),
        "Content-type": "application/json",
        "Authorization": `Token ${getToken()}`
      },
      credentials: "include",
      body: JSON.stringify({
        "username": data["username"],
        "password": data["password"]
      })
    })
      .then(() => dispatch({ type: "LOGIN", payload: data["username"] }))
      .then(() => navigate("/"))

  })

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow-lg rounded-xl w-96">
          <h1 className="text-2xl text-gray-700 font-bold text-center mb-8">Login</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
              <input className="w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" type="text" {...register("username", {
                required: {
                  value: true,
                  message: "Username is required"
                }
              })} />
            </div>

            <div>
              <label className="block text-gray-700 font-medium" htmlFor="password">
                Password
              </label>
              <input className="w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" type="text" {...register("password", {
                required: {
                  value: true,
                  message: "Password required"
                }
              })} />
            </div>

            <button className="mt-2 w-full bg-gray-800 text-white py-1 rounded-sm hover:bg-gray-900 transition">Login</button>

          </form>
          <a href="/registration" className="mt-2 block text-blue-700 text-right underline"> Create an account </a>
        </div>

      </div>
    </>

  )

}
