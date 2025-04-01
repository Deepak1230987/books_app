import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import FileView from "./pages/fileview";
import ExtractText from "./pages/extracttext";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/fileview" element={<FileView />} />
        <Route path="/extractext" element={<ExtractText />} />
      </Routes>
    </Router>
  );
}

export default App;
