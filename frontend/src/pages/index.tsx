import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
const Home = (): ReactElement => {
  const navigate = useNavigate()
  const handleNavigation = async (page: string): Promise<void> => {
    try {
      await navigate(page)
    } catch (error) {
      console.error('Navigation impossible')
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <header className='bg-sky-600 text-white py-8 shadow-md'>
        <div className='container mx-auto mb-6 px-4 text-center -mt-6'>
          <h1 className='text-4xl font-bold mb-2'>TaskManager</h1>
          <p className='text-lg'>Organice your day</p>
        </div>
      </header>

      <main className='flex-grow flex items-center justify-center'>
        <div className='bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center'>
          <h2 className='text-2xl font-semibold mb-6'>Welcome to your personal task manager</h2>
          <p className='mb-6 text-gray-600'>
            Login or Register to start organizing your daily activities
          </p>
          <div className='flex justify-center space-x-4'>
            <button
              onClick={() => { handleNavigation('/login').catch(() => { }) }}
              className='bg-sky-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl'
            >
              Login
            </button>
            <button
              onClick={() => { handleNavigation('/registration').catch(() => { }) }}
              variant='outline'
              className='px-6 py-2 rounded-xl hover:bg-gray-200'
            >
              Register
            </button>
          </div>
        </div>
      </main>

      <footer className='text-center text-gray-500 py-4 text-sm'>
        © 2025 TaskMaster. All rights reserved.
      </footer>
    </div>
  )
}
export default Home
