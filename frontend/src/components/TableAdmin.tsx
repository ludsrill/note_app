import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react'
import { getToken } from '../utils/utils'

export const TableAdmin = ({ columns, setItems }) => {
  const handleSelection = (data) => {
    setItems(data.selectedRows)
  }
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/tasks/admin/', {
      method: 'GET',
      headers: { Authorization: `Token ${getToken()}` }
    }).then(async (response) => await response.json())
      .then((response) => {
        setData(response)
      })
  }, [])

  console.log(data)
  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
        background: 'gray',
        color: 'gray'
      }
    },
    headRow: {
      style: {
        borderRadius: '8px',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: 'gray',
        background: 'oklch(58.8% 0.158 241.966)',
        color: 'white'
      }
    },
    headCells: {
      style: {
        '&:not(:last-child)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: 'gray'
        }
      }
    },
    cells: {
      style: {
        '&:not(:last-child)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: 'gray'
        }
      }
    },
    rows: {
      style: {
        '&:last-of-type': {
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomColor: 'gray',
          borderRadius: '8px'
        }
      }
    },
    pagination: {
      style: {
        backgroundColor: '#f3f4f6',
        color: 'black'
      },
      pageButtonsStyle: {
        fill: 'black',
        '&:hover': {
          backgroundColor: 'black'
        },
        '&:disabled': {
          fill: 'gray'
        }
      }
    },
    table: {
      style: {
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
        borderLeftColor: 'gray',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: 'gray',
        borderRadius: '8px',
        overflow: 'hidden'
      }
    }
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handleSelection}
        customStyles={customStyles}
      />
    </>

  )
}
