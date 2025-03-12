import { useForm } from 'react-hook-form'


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


  const onSubmit = handleSubmit((data) => {
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => console.log(data))

    reset()
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
    <button>Send Task</button>

    <pre>
      {JSON.stringify(watch(), null, 2)}
    </pre>

  </form >
}