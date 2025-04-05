import Upload from "./uploadpdf";

import { useState } from "react";
import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 

const UserPage = () => {
    const navigate = useNavigate();
    const handleupload = () => {
        navigate("/uploadpdf");
    
    }
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await fetch("http://localhost:5000/user", {
//         credentials: "include",
//       });
//       const data = await response.json();
//       setUser(data);
//     };

//     fetchUser();
//   }, []);

//   if (!user) return <div>Loading...</div>;

  return (
    <div className="user-page">
        <nav className="navbar">
        <ul className="navbar-list">
            <li><a href="/user">User</a></li>
            <li><a href="/uploadpdf">Upload PDF</a></li>
            <li><a href="/fileview">File View</a></li>
        </ul>
        </nav>
      <h1>Hello, </h1>
      <h2>Your email: </h2>
      <button onClick={handleupload}>upload a pdf</button>
    </div>
  );
}

export default UserPage;