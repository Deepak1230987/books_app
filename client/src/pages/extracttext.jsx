import React, { useState } from "react";

export const extractTextFromFile = async (filename) => {
  try {
    const response = await fetch(`http://localhost:5000/extract-text/${filename}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in extracting text:", error);
    throw error;
  }
};

const ExtractText = () => {
  const [filename, setFilename] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (filename) {
      try {
        setLoading(true);
        const data = await extractTextFromFile(filename);
        setExtractedText(data.text || "No text found in the file.");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Extract Text from File
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Extracting..." : "Extract Text"}
          </button>
        </form>
        {extractedText && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Extracted Text:</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{extractedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtractText;

