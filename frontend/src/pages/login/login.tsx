import { useForm } from 'react-hook-form'
import { getCsrfToken } from '../../utils/utils'
import { ReactElement, useContext, useState } from 'react'
import { AuthContext } from '../../context/Authcontext'
import { useNavigate } from 'react-router-dom'
import FloatingMessage from '../../components/FloatingText'

export default function LoginPage (): ReactElement {
  const { register, handleSubmit } = useForm()
  const { dispatch } = useContext(AuthContext)
  const [loginState, setLoginState] = useState(0)
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCsrfToken(),
          'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      })

      if (response.ok) {
        dispatch({ type: 'LOGIN', payload: data.username })
        await navigate('/list')
        setLoginState(0)
      } else {
        setLoginState((prev) => prev + 1)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  })

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 shadow-lg rounded-xl w-96'>
          <h1 className='text-2xl font-bold text-center mb-8'>Login</h1>
          <form onSubmit={(e) => { onSubmit(e).catch(() => { }) }} className='space-y-4'>
            <div>
              <label htmlFor='username' className='block  font-medium'>Username</label>
              <input
                className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' type='text' {...register('username', {
                  required: {
                    value: true,
                    message: 'Username is required'
                  }
                })}
              />
            </div>

            <div>
              <label className='block  font-medium' htmlFor='password'>
                Password
              </label>
              <input
                className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' type='text' {...register('password', {
                  required: {
                    value: true,
                    message: 'Password required'
                  }
                })}
              />
            </div>

            <button className='mt-2 w-full bg-sky-600 text-white py-1 rounded-xl hover:bg-blue-700 transition'>Login</button>

          </form>
          <a href='/registration' className='mt-2 block text-blue-700 text-right underline'> Create an account </a>
        </div>

      </div>
      {loginState > 0 && <FloatingMessage key={loginState} />}

    </>

  )
}
