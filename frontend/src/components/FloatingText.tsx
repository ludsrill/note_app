import React, { useEffect, useState } from 'react'

const FloatingMessage = () => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null
  return (
    <div className='fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500'>
      Incorrect Username or Password
    </div>
  )
}

export default FloatingMessage
