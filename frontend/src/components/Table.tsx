import { useState } from "react";
import DataTable from "react-data-table-component";

export const Table = ({ columns, data, setItems }) => {
  const handleSelection = (data) => {
    setItems(data.selectedRows)
  }

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
        background: "#ebebeb",
        color: "gray",
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
        pagination={data.length >= 1 ? true : false}
      />
    </>

  )

}