import { useState } from "react";
import PDFViewer from "./PdfViewer";
const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert("File uploaded! URL: " + data.url);
  };

  return (
    <div>
      <input 
      type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload PDF</button>

  
    </div>
  );
};

export default FileUpload;
