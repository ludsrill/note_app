
import AddTask from "./pages/add/addTask";
import { Registration } from "./pages/registration/registration";
import Home from "./pages";
import NavBar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  )
}

export default App
