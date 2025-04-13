import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { getToken } from "../utils/utils";

export const Table = ({ columns, setItems }) => {
  const handleSelection = (data) => {
    setItems(data.selectedRows)
  }
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const fetchUsers = async page => {
    setLoading(true);
    await fetch(`http://127.0.0.1:8000/tasks/?page=${page}`, {
      method: "GET",
      headers: { "Authorization": `Token ${getToken()}` }
    }).then((response) => response.json())
      .then((response) => {
        console.log(response["count"])
        setData(response["results"]);
        setTotalRows(response["count"]);
      })

    setLoading(false);
  };
  const handlePageChange = page => {
    fetchUsers(page);
  };


  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
        background: "gray",
        color: "gray",
      },
    },
    headRow: {
      style: {
        borderRadius: '8px',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: "gray",
        background: "oklch(58.8% 0.158 241.966)",
        color: "white",
      },
    },
    headCells: {
      style: {
        '&:not(:last-child)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: "gray",
        }
      },
    },
    cells: {
      style: {
        '&:not(:last-child)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: "gray",
        },
      },
    },
    rows: {
      style: {
        '&:last-of-type': {
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomColor: "gray",
          borderRadius: "8px",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f3f4f6',
        color: 'black',
      },
      pageButtonsStyle: {
        fill: 'black',
        '&:hover': {
          backgroundColor: 'black',
        },
        '&:disabled': {
          fill: 'gray',
        },
      },
    },
    table: {
      style: {
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
        borderLeftColor: "gray",
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: "gray",
        borderRadius: "8px",
        overflow: "hidden",
      },
    },
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handleSelection}
        customStyles={customStyles}
        progressPending={loading}
        pagination
        paginationServer
        paginationPerPage={5}
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
      />
    </>

  )

}