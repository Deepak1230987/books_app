import { useState } from "react";
import { HiUpload } from "react-icons/hi"; // Install with: npm install react-icons

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    publisher: '',
    publishedDate: '',
    language: '',
    description: '',
  });

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    setLoading(true);
    const completeFormData = new FormData();
    for (const key in formData) {
      completeFormData.append(key, formData[key]);
    }
    completeFormData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: completeFormData,
      });

      const data = await response.json();
      alert("File uploaded successfully! URL: " + data.url);
    } catch (error) {
      alert("Upload failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Upload Your Book</h1>
        
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Enter book title" 
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input 
                  type="text" 
                  name="author" 
                  placeholder="Author name" 
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <input 
                  type="text" 
                  name="genre" 
                  placeholder="Book genre" 
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input 
                  type="text" 
                  name="price" 
                  placeholder="Price" 
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>


              <div>
                <label className="block text-m font-medium text-gray-700 mb-1">Estimated reading time</label>
                <input 
                  type="number"
                  name="Estimated reading time" 
                    placeholder="Estimated reading time in minutes"
                  
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                <input 
                  type="text" 
                  name="publisher" 
                  placeholder="Publisher name" 
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                <input 
                  type="date" 
                  name="publishedDate" 
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <input 
                  type="text" 
                  name="language" 
                  placeholder="Book language" 
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>


                {/* Added number of pages input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of pages</label>
                <input 
                  type="number" 
                  name="Number of pages" 
                  placeholder="Number of pages" 
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ISBN </label>
                <input 
                  type="number" 
                  name="ISBN"
                  placeholder="ISBN" 
                 
                  required 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              


            </div>
          </div>

         
          
          {/* Full width inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              name="description" 
              placeholder="Book description" 
              required 
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            ></textarea>
          </div>
          
          {/* File upload with styled button */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Upload PDF File</label>
            <div className="mt-1 flex items-center">
              <label className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <HiUpload className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-sm text-gray-600">
                  {file ? file.name : "Choose PDF file"}
                </span>
                <input 
                  type="file" 
                  accept="application/pdf" 
                  required 
                  onChange={handleFileChange}
                  className="hidden" 
                />
              </label>
            </div>
            {file && (
              <p className="mt-2 text-sm text-green-600">
                File selected: {file.name}
              </p>
            )}
          </div>
          
          <div className="flex justify-center mt-8">
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-70 flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>Upload Book</>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Preview section - Uncomment when PDFViewer is available */}
      {/* {fileUrl && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Preview</h2>
          <div className="border border-gray-200 rounded-lg p-4">
            <PDFViewer fileUrl={fileUrl} />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Upload;
