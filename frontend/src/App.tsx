import { useState } from 'react'
import { useForm } from 'react-hook-form'
function App() {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    watch
  } = useForm()


  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <>
      <h1>
        Hello world!
      </h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Name
        </label>
        <input type="text" {...register("name", {
          required: {
            value: true,
            message: "Name is required"
          }
        })} />
        {errors.name && <span>{errors.name.message}</span>}


        <label htmlFor="email">Email</label>
        <input type="email" {...register("email", {
          required: {
            value: true,
            message: "Email is required"
          },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,4}$/,
            message: 'Invalid email'
          }
        })} />
        {errors.email && <span>{errors.email.message}</span>}


        <label htmlFor="password">Password</label>
        <input type="password" {...register("password", {
          required: {
            value: true,
            message: "Password is required"
          }
        })} />
        {errors.password && <span>{errors.password.message}</span>}

        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="password" {...register("confirmPassword", {
          required: {
            value: true,
            message: "Password is required"
          },
          validate: (value) => {
            return value === watch("password") || "Passwords must be equals"
          }
        })} />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

        <label htmlFor="birthDate">Birth Data</label>
        <input type="date" {...register("birthDate", {
          required: {
            value: true,
            message: "Birth date is required"
          },
          validate: (value) => {
            console.log(value)
            const birthDate = new Date(value)
            const today = new Date()
            const age = today.getFullYear() - birthDate.getFullYear()

            return age <= 18 ? "Must be an adult" : true
          }
        })} />
        {errors.birthDate && <span>{errors.birthDate.message}</span>}

        <label htmlFor="country">Country</label>
        <select {...register("country", {
          required: {
            value: true,
            message: "Country is required"
          },

        })}>
          <option value="co">Colombia</option>
          <option value="mx">Mexico</option>
        </select>
        {errors.country && <span>{errors.country.message}</span>}

        <button>Send Data</button>

        <pre>
          {JSON.stringify(watch(), null, 2)}
        </pre>

      </form >

    </>
  )
}

export default App
