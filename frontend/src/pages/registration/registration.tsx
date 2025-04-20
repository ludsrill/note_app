import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function Registration (): ReactElement {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const onSubmit = handleSubmit(async (data) => {
    if (data.password === data.repeat_password) {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/registration/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
          })
        })

        if (response.ok) {
          await navigate('/login', { replace: true })
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  })

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 shadow-lg rounded-xl w-96'>
        <h1 className='text-2xl font-bold text-center mb-8'>Registration</h1>
        <form onSubmit={(e) => { onSubmit(e).catch(() => { }) }}>
          <label className='block  font-medium' htmlFor='first_name'>
            First Name
          </label>
          <input
            className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' type='text' {...register('first_name', {
              required: {
                value: true,
                message: 'First Name is required'
              }
            })}
          />

          <label className='block  font-medium' htmlFor='last_name'>
            Last Name
          </label>
          <input
            className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' type='text' {...register('last_name', {
              required: {
                value: true,
                message: 'Last Name is required'
              }
            })}
          />

          <label className='block  font-medium' htmlFor='username'>
            Username
          </label>
          <input
            className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' type='text' {...register('username', {
              required: {
                value: true,
                message: 'Username is required'
              }
            })}
          />

          <label className='block  font-medium' htmlFor='email'>
            Email
          </label>
          <input
            className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' type='text' {...register('email', {
              required: {
                value: true,
                message: 'Email is required'
              }
            })}
          />

          <label className='block  font-medium' htmlFor='password'>
            Password
          </label>
          <input
            className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' type='text' {...register('password', {
              required: {
                value: true,
                message: 'Password is required'
              }
            })}
          />

          <label className='block  font-medium' htmlFor='repeat-password'>
            Repeat password
          </label>
          <input
            className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' type='text' {...register('repeat_password', {
              required: {
                value: true,
                message: 'Repeat the password'
              }
            })}
          />

          <br />
          <br />
          <button className='mt-2 w-full bg-sky-600 text-white py-1 rounded-xl hover:bg-blue-700 transition'>Register</button>

        </form>
      </div>
    </div>
  )
}
