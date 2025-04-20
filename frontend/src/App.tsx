import React from 'react'
import AddTask from './pages/add/addTask'
import { Registration } from './pages/registration/registration'
import LoginPage from './pages/login/login'
import ListTasks from './pages/list_tasks/listTasks'
import Home from './pages/index'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'

import { RedirectLogin, RedirectNoLogin } from './pages/login/redirectIsAuthenticated'
import Admin from './pages/admin-dashboard/adminDashboard'

function App (): JSX.Element {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/list' element={
            <RedirectNoLogin>
              <ListTasks />
            </RedirectNoLogin>
          }
        />
        <Route
          path='/admin' element={
            <RedirectNoLogin>
              <Admin />
            </RedirectNoLogin>
          }
        />
        <Route path='/add-task' element={<AddTask />} />
        <Route
          path='/registration' element={
            <RedirectLogin>
              <Registration />
            </RedirectLogin>
          }
        />
        <Route
          path='/login' element={
            <RedirectLogin>
              <LoginPage />
            </RedirectLogin>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
