import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/utils'
import { useContext } from 'react'
import { AuthContext } from '../context/Authcontext'
import { getCsrfToken } from '../utils/utils'


export const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    watch,
    reset,
  } = useForm()
  const navigate = useNavigate();
  const { username } = useContext(AuthContext)



  const onSubmit = handleSubmit((data) => {
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": getCsrfToken(),
        "Authorization": `Token ${getToken()}`
      },
      credentials: 'include',
      body: JSON.stringify({ ...data, username: username })
    })
      .then(response => response.json())

    reset()
    navigate("/", { replace: true })

  })
  return <form onSubmit={onSubmit} >
    <label htmlFor="title">
      Task Tittle
    </label>
    <input type="text" {...register("title", {
      required: {
        value: true,
        message: "Task title is required"
      }
    })} />
    {errors.tittle && <span>{errors.tittle.message}</span>}


    <label htmlFor="task">Task Description</label>
    <input type="task" {...register("task", {
      required: {
        value: true,
        message: "Task description is required"
      }
    })} />
    {errors.task && <span>{errors.task.message}</span>}
    <br />
    <br />
    <button>Send Task</button>

    <pre>
      {JSON.stringify(watch(), null, 2)}
    </pre>

  </form >
}