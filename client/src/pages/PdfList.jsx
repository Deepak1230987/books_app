import { useState, useEffect } from "react";

const PDFList = ({ onSelect }) => {
  const [pdfs, setPdfs] = useState([]);
  console.log(pdfs);
  useEffect(() => {
    fetch("http://localhost:5000/files")
      .then(res => res.json())
      .then(data => setPdfs(data));
  }, []);

  return (
    <div>
      <h2>Available PDFs</h2>
      {pdfs.map((pdf, index) => (
        <button key={index} onClick={() => onSelect(pdf.url)}>
          {pdf.name}
        </button>
      ))}
    </div>
  );
};

export default PDFList;
