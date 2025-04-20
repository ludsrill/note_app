import { TableAdmin } from '../../components/TableAdmin'

const Admin = () => {
  const columns = [
    {
      name: 'Task',
      cell: row =>
        (
          <input className='w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' id={`${row.id}Task`} type='text' defaultValue={row.title} />
        )

    },
    {
      name: 'Description',
      cell: row => (
        <input className='w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' id={`${row.id}Description`} type='text' defaultValue={row.task} />
      )
    },
    {
      name: 'State',
      cell: row => (
        <select defaultValue={row.state} className='w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' id={`${row.id}State`}>
          <option value='In progress'>In progress</option>
          <option value='Done'>Done</option>
          <option value='Pending' selected>Pending</option>

        </select>
      )
    },
    {
      name: 'Priority',
      cell: row => (
        <select defaultValue={row.priority} className='w-full px-3 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500' id={`${row.id}Priority`}>
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low' selected>Low</option>

        </select>
      )
    }
  ]

  return (
    <div className='h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold text-center mb-8 py-8'>Check your tasks!</h1>

      <div className='px-8 py-4'>
        <TableAdmin columns={columns} setItems={setSelectedItems} />
      </div>

    </div>
  )
}

export default Admin
