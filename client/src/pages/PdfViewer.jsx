import { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry"; // Load PDF.js worker

const CustomPDFViewer = ({ pdfUrl }) => {
 
  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const loadedPdf = await loadingTask.promise;
        setPdf(loadedPdf);
        setTotalPages(loadedPdf.numPages);
        renderPage(1, loadedPdf, scale);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    if (pdfUrl) loadPDF();
  }, [pdfUrl]);

  useEffect(() => {
    if (pdf) renderPage(pageNum, pdf, scale);
  }, [pageNum, scale, pdf]);

  const renderPage = async (num, loadedPdf, scale) => {
    try {
      const page = await loadedPdf.getPage(num);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      page.render({ canvasContext: ctx, viewport });
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-3xl">
      {/* Toolbar */}
      <div className="flex justify-between items-center w-full bg-white p-3 rounded-lg shadow">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setPageNum((prev) => Math.max(1, prev - 1))}
          disabled={pageNum === 1}
        >
          Prev
        </button>
        <span className="text-gray-700 font-semibold">
          Page {pageNum} / {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setPageNum((prev) => Math.min(totalPages, prev + 1))}
          disabled={pageNum === totalPages}
        >
          Next
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="flex gap-4 my-3">
        <button
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
        >
          -
        </button>
        <span className="text-gray-700">{(scale * 100).toFixed(0)}%</span>
        <button
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          onClick={() => setScale((prev) => Math.min(2.0, prev + 0.1))}
        >
          +
        </button>
      </div>

      {/* PDF Canvas */}
      <div className="bg-white border border-gray-300 shadow-md p-4 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full" />
      </div>
    </div>
  );
};

export default CustomPDFViewer;
