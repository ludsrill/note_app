
import AddTask from "./pages/add/addTask";
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
      </Routes>
    </Router>
  )
}

export default App
