
import AddTask from "./pages/add/addTask";
import { Registration } from "./pages/registration/registration";
import LoginPage from "./pages/login/login";
import ListTasks from "./pages/list_tasks/listTasks";
import Home from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListTasks />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
