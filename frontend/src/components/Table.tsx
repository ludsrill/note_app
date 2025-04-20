import DataTable from 'react-data-table-component'
import { useState, useEffect, ReactElement } from 'react'
import { getToken } from '../utils/utils'
import { useNavigate } from 'react-router-dom'

export const Table = ({ columns, setItems }): ReactElement => {
  const navigate = useNavigate()
  const handleSelection = (data): void => {
    setItems(data.selectedRows)
  }
  const [data, setData] = useState([])
  const [totalRows, setTotalRows] = useState(0)

  const fetchUsers = async (page: number): Promise<void> => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/?page=${page}`, {
        method: 'GET',
        headers: { Authorization: `Token ${getToken()}` }
      })

      const responseData = await response.json()

      if (response.ok) {
        setData(responseData.results)
        setTotalRows(responseData.count)
        await navigate('/list', { replace: true })
      } else {
        console.error('Failed to create task', responseData)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handlePageChange = async (page: number): Promise<void> => {
    await fetchUsers(page)
  }

  useEffect(() => {
    (async () => {
      await fetchUsers(1)
    })().catch((error) => {
      console.error('Error in fetchUsers:', error)
    })
  }, [])

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
        pagination
        paginationServer
        paginationPerPage={5}
        paginationTotalRows={totalRows}
        onChangePage={(e) => { handlePageChange(e).catch(() => { }) }}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
      />
    </>

  )
}
