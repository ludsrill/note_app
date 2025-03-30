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
    <form onSubmit={onSubmit}>
      <label htmlFor="first_name">
        First Name
      </label>
      <input type="text" {...register("first_name", {
        required: {
          value: true,
          message: "First Name is required"
        }
      })} />

      <label htmlFor="last_name">
        Last Name
      </label>
      <input type="text" {...register("last_name", {
        required: {
          value: true,
          message: "Last Name is required"
        }
      })} />

      <label htmlFor="username">
        Username
      </label>
      <input type="text" {...register("username", {
        required: {
          value: true,
          message: "Username is required"
        }
      })} />

      <label htmlFor="email">
        Email
      </label>
      <input type="text" {...register("email", {
        required: {
          value: true,
          message: "Email is required"
        }
      })} />

      <label htmlFor="password">
        Password
      </label>
      <input type="text" {...register("password", {
        required: {
          value: true,
          message: "Password is required"
        }
      })} />

      <label htmlFor="repeat-password">
        Repeat password
      </label>
      <input type="text" {...register("repeat_password", {
        required: {
          value: true,
          message: "Repeat the password"
        }
      })} />

      <br />
      <br />
      <button>Send Task</button>


    </form>
  )




}