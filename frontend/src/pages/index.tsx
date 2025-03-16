import { useEffect, useState } from "react";
import { Table } from "../components/Table";



const TableActions = ({ isEditing, setIsEditing }) => {

  const handleEdition = () => {
    setIsEditing(!isEditing)
  }
  const handleOk = () => {
    setIsEditing(!isEditing)
  }
  const handleCancel = () => {
    setIsEditing(!isEditing)
  }

  return (
    <>
      {isEditing ? null : <button onClick={handleEdition}>Edit</button>}
      {
        isEditing
          ? (
            <>
              <button onClick={handleOk}>OK</button>
              <button onClick={handleCancel}>cancel</button>
            </>)
          : null}
    </>
  )
}

const Home = () => {
  const [data, setState] = useState([])
  const [selectedItems, setSelectedItems] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const handleDeleted = () => {
    selectedItems.map((data) => {
      fetch(`http://127.0.0.1:8000/tasks/${data.id}/`, {
        method: "DELETE",
      }).then(
        () => setDeleted((prev) => !prev)
      )
    })

  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((data) => {
        setState(data)
      })

    console.log(data)
  }, [deleted])


  const columns = [
    {
      name: "Task",
      cell: row => (
        <>{isEditing ? <input type="text" defaultValue={row.title} /> : row.title}</>
      )
    },
    {
      name: "Description",
      cell: row => (
        <>{isEditing ? <input type="text" defaultValue={row.task} /> : row.task}</>
      )
    },
    {
      name: "State",
      cell: row => (
        <>{isEditing ? <input type="text" defaultValue={row.state} /> : row.state}</>
      )
    },
    {
      name: "Actions",
      cell: row => (
        <TableActions
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )
    },
  ]



  return (
    <div>
      <h1>Check your tasks!</h1>
      <Table columns={columns} data={data} setItems={setSelectedItems} />
      <button onClick={handleDeleted}>Delete tasks</button>
    </div>
  );
};

export default Home;