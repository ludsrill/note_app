import { useForm } from "react-hook-form"

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  function getCsrfToken() {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith("csrftoken="))
      ?.split("=")[1];
  }

  const onSubmit = handleSubmit((data) => {
    fetch("http://localhost:8000/user/login/", {
      method: "POST",
      headers: { "X-CSRFToken": getCsrfToken(), "Content-type": "application/json", },
      credentials: "include",
      body: JSON.stringify({
        "username": data["username"],
        "password": data["password"]
      })
    })

  })

  return (
    <>
      <h1>Login</h1>
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
