import { useEffect, useState } from "react";
import { Table } from "../components/Table";

const Home = () => {
  const [data, setState] = useState([])
  const [selectedItems, setSelectedItems] = useState({})

  const handleDeleted = () => {
    selectedItems.map((data) => {
      fetch(`http://127.0.0.1:8000/tasks/${data.id}/`, {
        method: "DELETE",
      })
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
  }, [handleDeleted])


  const columns = [
    {
      name: "Task",
      selector: row => row.title
    },
    {
      name: "Description",
      selector: row => row.task
    },
    {
      name: "State",
      selector: row => row.state
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