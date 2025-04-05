import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import FileView from "./pages/fileview";
import UserPage from "./user/userPage";
import Upload from "./user/uploadpdf";
import { Toaster } from 'react-hot-toast';
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 font-sans">
      <Router>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-6 pb-12">
            <Toaster position="top-center" toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }} />
            <Routes>
              <Route 
                path="/signup" 
                element={
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-10 px-8 shadow-xl rounded-3xl sm:px-12 border border-gray-100">
                      <Signup />
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-10 px-8 shadow-xl rounded-3xl sm:px-12 border border-gray-100">
                      <Login />
                    </div>
                  </div>
                } 
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Welcome />} />
              <Route path="/fileview" element={<FileView />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/uploadpdf" element={<Upload />} />
              <Route path="/about" element={<About />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
