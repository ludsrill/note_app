import { useState } from "react";
import DataTable from "react-data-table-component";

export const Table = ({ columns, data, setItems }) => {

  console.log(data)

  const handleSelection = (data) => {
    setItems(data.selectedRows)
  }


  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handleSelection}
      />

    </>

  )

}