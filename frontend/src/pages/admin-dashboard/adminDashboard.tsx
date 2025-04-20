import { TableAdmin } from '../../components/TableAdmin'

const Admin = () => {
  const columns = [
    {
      name: 'Task',
      cell: row =>
        row.title

    },
    {
      name: 'Description',
      cell: row => (
        <>{row.task}</>
      )
    },
    {
      name: 'State',
      cell: row => (
        <>
          {row.state}
        </>
      )
    },
    {
      name: 'Priority',
      cell: row => (
        <>
          {row.priority}
        </>
      )
    }
  ]

  return (
    <div className='h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold text-center mb-8 py-8'>Check your tasks!</h1>

      <div className='px-8 py-4'>
        <TableAdmin columns={columns} />
      </div>

    </div>
  )
}

export default Admin
