import { useState, useEffect } from "react";
import extractText from "./extracttext";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry"; // Load PDF.js worker

const PDFList = ({ onSelect }) => {
  const [pdfs, setPdfs] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const [summary, setSummary] = useState("");
  const [selectedPdf, setSelectedPdf] = useState("");
  const [error, setError] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/files")
      .then((res) => res.json())
      .then((data) => {
        setPdfs(data);
        generateThumbnails(data);
      })
      .catch((err) => console.error("Error fetching files:", err));
  }, []);

  const generateThumbnails = async (pdfList) => {
    const newThumbnails = {};
    for (const pdf of pdfList) {
      const firstPage = await getPdfThumbnail(pdf.url);
      newThumbnails[pdf.url] = firstPage;
    }
    setThumbnails(newThumbnails);
  };

  const getPdfThumbnail = async (pdfUrl) => {
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const scale = 0.3;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Error generating PDF thumbnail:", error);
      return null;
    }
  };

  const handleExtractText = async (pdfName) => {
    setSummary("");
    setError(null);
    setSelectedPdf(pdfName);
    setLoadingSummary(true);

    const data = await extractText(pdfName);
    if (data && data.summary) {
      setSummary(data.summary);
    } else {
      setError("Failed to extract text.");
    }
    setLoadingSummary(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {pdfs.map((pdf, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-transform transform hover:scale-105"
        >
          {/* PDF Thumbnail */}
          {thumbnails[pdf.url] ? (
            <img
              src={thumbnails[pdf.url]}
              alt={`Thumbnail of ${pdf.name}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}

          {/* PDF Info */}
          <h3 className="text-lg font-bold text-gray-800 mt-4">{pdf.name}</h3>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => onSelect(pdf.url)}
            >
              View
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              onClick={() => handleExtractText(pdf.name)}
            >
              Summarize
            </button>
          </div>
        </div>
      ))}

      {/* ✅ Display Summary Below */}
      {selectedPdf && (
        <div className="w-full bg-gray-100 p-6 rounded-xl shadow-md border border-gray-300 mt-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Summary of {selectedPdf}
          </h3>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {loadingSummary ? (
            <p className="text-gray-500 mt-2">Loading summary...</p>
          ) : (
            <p className="text-gray-700 mt-2">{summary || "No summary available."}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFList;
