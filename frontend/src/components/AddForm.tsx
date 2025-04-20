import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getToken, getCsrfToken } from '../utils/utils'
import { useContext } from 'react'
import { AuthContext } from '../context/Authcontext'
import type { ReactElement } from 'react'

interface FormValues {
  title: string
  task: string
}

export const AddForm = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>()
  const navigate = useNavigate()
  const { username } = useContext(AuthContext)

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
          Authorization: `Token ${getToken()}`
        },
        credentials: 'include',
        body: JSON.stringify({ ...data, username })
      })

      if (response.ok) {
        reset()
        await navigate('/list', { replace: true })
      } else {
        console.error('Failed to create task', await response.json())
      }
    } catch (error) {
      console.error('Error:', error)
    }
  })

  return (
    <form onSubmit={(e) => { onSubmit(e).catch(() => { }) }}>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 shadow-lg rounded-xl w-96'>
          <h1 className='text-2xl text-gray-700 font-bold text-center mb-8'>
            Add a new task
          </h1>
          <label className='block text-gray-600 font-medium' htmlFor='title'>
            Task Title
          </label>
          <input
            className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500 mb-4'
            type='text'
            {...register('title', {
              required: {
                value: true,
                message: 'Task title is required'
              }
            })}
          />
          {(errors.title != null) && <span className='text-red-500 text-sm'>{errors.title.message}</span>}

          <label className='block text-gray-600 font-medium' htmlFor='task'>
            Task Description
          </label>
          <input
            className='w-full px-3 py-0.5 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500 mb-4'
            type='text'
            {...register('task', {
              required: {
                value: true,
                message: 'Task description is required'
              }
            })}
          />
          {(errors.task != null) && <span className='text-red-500 text-sm'>{errors.task.message}</span>}
          <button
            type='submit'
            className='mt-2 w-full bg-sky-600 text-white py-1 rounded-sm hover:bg-blue-700 transition'
          >
            Send Task
          </button>
        </div>
      </div>
    </form>
  )
}
