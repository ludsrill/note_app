import { useForm } from "react-hook-form"
import { replace, useNavigate } from "react-router-dom"


export function Registration() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    if (data.password === data.repeat_password) {

      fetch("http://127.0.0.1:8000/user/registration/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "username": data.username,
          "password": data.password,
          "email": data.email,
          "first_name": data.first_name,
          "last_name": data.last_name
        })
      })
        .then(() => navigate("/login", { replace: true }))
    }
  })


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h1 className="text-2xl text-gray-700 font-bold text-center mb-8">Registration</h1>
        <form onSubmit={onSubmit}>
          <label className="block text-gray-600 font-medium" htmlFor="task" htmlFor="first_name">
            First Name
          </label>
          <input className="w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" type="text" {...register("first_name", {
            required: {
              value: true,
              message: "First Name is required"
            }
          })} />

          <label className="block text-gray-600 font-medium" htmlFor="task" htmlFor="last_name">
            Last Name
          </label>
          <input className="w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" type="text" {...register("last_name", {
            required: {
              value: true,
              message: "Last Name is required"
            }
          })} />

          <label className="block text-gray-600 font-medium" htmlFor="task" htmlFor="username">
            Username
          </label>
          <input className="w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" type="text" {...register("username", {
            required: {
              value: true,
              message: "Username is required"
            }
          })} />

          <label className="block text-gray-600 font-medium" htmlFor="task" htmlFor="email">
            Email
          </label>
          <input className="w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" type="text" {...register("email", {
            required: {
              value: true,
              message: "Email is required"
            }
          })} />

          <label className="block text-gray-600 font-medium" htmlFor="task" htmlFor="password">
            Password
          </label>
          <input className="w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" type="text" {...register("password", {
            required: {
              value: true,
              message: "Password is required"
            }
          })} />

          <label className="block text-gray-600 font-medium" htmlFor="task" htmlFor="repeat-password">
            Repeat password
          </label>
          <input className="w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" type="text" {...register("repeat_password", {
            required: {
              value: true,
              message: "Repeat the password"
            }
          })} />

          <br />
          <br />
          <button className="mt-2 w-full bg-gray-800 text-white py-1 rounded-sm hover:bg-gray-900 transition">Register</button>


        </form>
      </div>
    </div>
  )




}