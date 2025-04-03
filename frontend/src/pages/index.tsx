import { useContext, useEffect, useState } from "react";
import { Table } from "../components/Table";
import { getCsrfToken, getToken } from "../utils/utils";
import { AuthContext } from "../context/Authcontext";

const TableActions = ({ row, setCurrentClick, currentClick, setOnUpdate }) => {
  const { username } = useContext(AuthContext)
  const handleEdition = () => {
    setCurrentClick((prev) => [...prev, row])
  }
  const handleOk = () => {
    setCurrentClick((prev) => [...prev].filter(value => value != row))

    const inputTask = document.getElementById(`${row}Task`);
    const inputDescription = document.getElementById(`${row}Description`);
    const inputState = document.getElementById(`${row}State`);


    const body = {
      "id": row,
      "title": inputTask.value,
      "task": inputDescription.value,
      "state": inputState.value,
      "username": username
    }

    fetch(`http://127.0.0.1:8000/tasks/${row}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getToken()}`
      },
      body: JSON.stringify(body)
    }).then(() => setOnUpdate((prev) => !prev))

  }
  const handleCancel = () => {
    setCurrentClick((prev) => [...prev].filter(value => value != row))
  }
  return (
    <>
      {currentClick.includes(row) ? null : <button className="mr-3 text-right bg-gray-600 text-white p-2 py-1 text-white rounded-sm hover:bg-gray-900 transition" onClick={handleEdition}>Edit</button>}
      {
        currentClick.includes(row)
          ? (
            <>
              <button className="mr-3 text-right bg-gray-600 text-white p-2 py-1 text-white rounded-sm hover:bg-gray-900 transition" onClick={handleOk}>OK</button>
              <button className="text-right bg-gray-600 text-white p-2 py-1 text-white rounded-sm hover:bg-gray-900 transition" onClick={handleCancel}>cancel</button>
            </>)
          : null}
    </>
  )
}

const Home = () => {
  const [data, setState] = useState([])
  const [selectedItems, setSelectedItems] = useState({})
  const [onUpdate, setOnUpdate] = useState(false)
  const [currentClick, setCurrentClick] = useState([])


  const handleDeleted = () => {
    selectedItems.map((data) => {
      fetch(`http://127.0.0.1:8000/tasks/${data.id}/`, {
        method: "DELETE",
        headers: {
          "X-CSRFtoken": getCsrfToken(),
          "Authorization": `Token ${getToken()}`
        }
      }).then(
        () => setOnUpdate((prev) => !prev)
      )
    })

  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "GET",
      headers: { "Authorization": `Token ${getToken()}` }
    })
      .then((data) => data.json())
      .then((data) => {
        setState(data)
      })

  }, [onUpdate])


  const columns = [
    {
      name: "Task",
      cell: row =>
      (
        <>{currentClick.includes(row.id) ? <input className="w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" id={`${row.id}Task`} type="text" defaultValue={row.title} /> : row.title}</>
      )

    },
    {
      name: "Description",
      cell: row => (
        <>{currentClick.includes(row.id) ? <input className="w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" id={`${row.id}Description`} type="text" defaultValue={row.task} /> : row.task}</>
      )
    },
    {
      name: "State",
      cell: row => (
        <>
          {currentClick.includes(row.id) ?
            <select defaultValue={row.state} className="w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500" id={`${row.id}State`} >
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
              <option value="Pending" selected>Pending</option>

            </select> : row.state}</>
      )
    },
    {
      name: "Actions",
      cell: row => (
        <TableActions
          row={row.id}
          currentClick={currentClick}
          setCurrentClick={setCurrentClick}
          setOnUpdate={setOnUpdate}
        />
      )
    },
  ]



  return (
    <div>
      <h1 className="text-2xl text-gray-600 font-bold text-center mb-8 mt-8">Check your tasks!</h1>
      <div>
        <div className="ml-8">
          <button
            className="bg-gray-600 text-white p-2 py-1 text-white rounded-md hover:bg-gray-900 transition"
            onClick={handleDeleted}>Delete tasks</button>
        </div>
        <div className="px-8 py-4">
          <Table columns={columns} data={data} setItems={setSelectedItems} />
        </div>
      </div>

    </div >
  );
};

export default Home;