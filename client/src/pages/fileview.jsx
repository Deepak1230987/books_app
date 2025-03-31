import { useState } from "react";
import FileUpload from "./FileUpload";
import PDFList from "./PdfList";
import PDFViewer from "./PdfViewer";

const FileView = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex flex-col items-center py-12">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          📂 PDF File Manager
        </h1>
        
        <div className="space-y-10">
          {/* File Upload Section */}
          <div className="bg-gradient-to-r from-blue-200 to-indigo-300 p-6 rounded-2xl shadow-md border border-gray-300 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-white text-center mb-4">Upload Your PDF</h2>
            <FileUpload />
          </div>

          {/* PDF List Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Your PDFs</h2>
            <PDFList onSelect={setSelectedPdf} />
          </div>

          {/* PDF Viewer Section */}
          {selectedPdf && (
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Preview</h2>
              <PDFViewer pdfUrl={selectedPdf} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileView;
