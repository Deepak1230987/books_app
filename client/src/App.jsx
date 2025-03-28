import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import FileView from "./pages/fileview";

function App() {
  return (
    <Router>
      <h1 className="text-4xl font-bold text-center">BookApp</h1>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/fileview" element={<FileView />} />
      </Routes>
    </Router>
  );
}

export default App;
