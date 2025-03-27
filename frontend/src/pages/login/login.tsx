import { useForm } from "react-hook-form"

export default function LoginPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit((data) => {
    fetch("http://localhost:8000/user/login/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "username": data["username"],
        "password": data["password"]
      })
    }).then((response) => console.log(response))

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
