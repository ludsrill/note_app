import { useContext, useState, ReactElement } from 'react'
import { Table } from '../../components/Table'
import { getCsrfToken, getToken } from '../../utils/utils'
import { AuthContext } from '../../context/Authcontext'
import { Navigate } from 'react-router-dom'

const TableActions = ({ row, setCurrentClick, currentClick, setOnUpdate }): ReactElement => {
  const { username } = useContext(AuthContext)
  const handleEdition = (): void => {
    setCurrentClick((prev) => [...prev, row])
  }
  const handleCancel = (): void => {
    setCurrentClick((prev) => [...prev].filter(value => value !== row))
  }
  const handleOk = async (): Promise<void> => {
    setCurrentClick((prev) => [...prev].filter(value => value !== row))

    if (typeof row === 'number') {
      const inputTask = document.getElementById(`${row}Task`)
      const inputDescription = document.getElementById(`${row}Description`)
      const inputState = document.getElementById(`${row}State`)
      const inputPriority = document.getElementById(`${row}Priority`)

      const body = {
        id: row,
        title: inputTask.value,
        task: inputDescription.value,
        state: inputState.value,
        priority: inputPriority.value,
        username
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/tasks/${row}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${getToken()}`
          },
          body: JSON.stringify(body)
        })

        if (response.ok) {
          setOnUpdate((prev: boolean) => !prev)
        } else {
          console.error('Failed to create task', await response.json())
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return (
    <>
      {currentClick.includes(row) === null
        ? null
        : (
          <button className='mr-3 text-right bg-sky-600 text-white p-2 py-1 text-white rounded-sm hover:bg-blue-700 transition' onClick={handleEdition}>
            Edit
          </button>
          )}
      {
        currentClick.includes(row) === null
          ? null
          : (
            <>
              <button
                className='mr-3 text-right bg-sky-600 text-white p-2 py-1 text-white rounded-sm hover:bg-blue-700 transition'
                onClick={() => { handleOk().catch(() => { }) }}
              >
                OK
              </button>
              <button className='text-right bg-sky-600 text-white p-2 py-1 text-white rounded-sm hover:bg-blue-700 transition' onClick={handleCancel}>cancel</button>
            </>)
      }
    </>
  )
}
interface RowData {
  id: number
  title: string
  task: string
  state: 'In progress' | 'Done' | 'Pending'
  priority: 'High' | 'Medium' | 'Low'
}
const ListTasks = (): ReactElement => {
  const [selectedItems, setSelectedItems] = useState({})
  const [currentClick, setCurrentClick] = useState<number[]>([])

  const handleDeleted = async (): Promise<void> => {
    const deletePromises = selectedItems.map(async (data: { id: number }) =>
      await fetch(`http://127.0.0.1:8000/tasks/${data.id}/`, {
        method: 'DELETE',
        headers: {
          'X-CSRFtoken': getCsrfToken(),
          Authorization: `Token ${getToken()}`
        }
      }).catch((error) => {
        console.error(`Failed to delete task ${data.id}:`, error)
      })
    )

    return Promise.all(deletePromises).then(() => { })
  }

  const columns = [
    {
      name: 'Task',
      cell: (row: RowData) =>
        (
          <>{currentClick.includes(row.id) !== null ? <input className='w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' id={`${row.id}Task`} type='text' defaultValue={row.title} /> : row.title}</>
        )

    },
    {
      name: 'Description',
      cell: (row: RowData) => (
        <>{currentClick.includes(row.id) !== null ? <input className='w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' id={`${row.id}Description`} type='text' defaultValue={row.task} /> : row.task}</>
      )
    },
    {
      name: 'State',
      cell: (row: RowData) => (
        <>
          {currentClick.includes(row.id) !== null
            ? (
              <select
                defaultValue={row.state}
                className='w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500'
                id={`${row.id}State`}
              >
                <option value='In progress'>In progress</option>
                <option value='Done'>Done</option>
                <option value='Pending' selected>Pending</option>
              </select>
              )
            : row.state}
        </>
      )
    },
    {
      name: 'Priority',
      cell: (row: RowData) => (
        <>
          {currentClick.includes(row.id) !== null
            ? (
              <select
                defaultValue={row.priority}
                className='w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500'
                id={`${row.id}Priority`}
              >
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low' selected>Low</option>

              </select>
              )
            : row.priority}
        </>
      )
    },
    {
      name: 'Actions',
      cell: (row: RowData) => (
        <TableActions
          row={row.id}
          currentClick={currentClick}
          setCurrentClick={setCurrentClick}
          setOnUpdate={setOnUpdate}
        />
      )
    }
  ]

  return (
    <div className='h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold text-center mb-8 py-8'>Check your tasks!</h1>
      <div className='flex'>
        <div className='ml-8'>
          <button
            className='bg-sky-600 text-white p-2 py-1 text-white rounded-md hover:bg-blue-700 transition'
            onClick={() => { handleDeleted().catch(() => { }) }}
          >Delete tasks
          </button>
        </div>
        <div className='ml-4'>
          <button
            className='bg-sky-600 text-white p-2 py-1 text-white rounded-md hover:bg-blue-700 transition'
            onClick={() => { <Navigate to='/add-task' replace /> }}
          >Add tasks
          </button>
        </div>

      </div>
      <div className='px-8 py-4'>
        <Table columns={columns} setItems={setSelectedItems} />
      </div>

    </div>
  )
}

export default ListTasks
