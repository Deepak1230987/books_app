import { useState } from "react";
import FileUpload from "./Fileupload";
import PDFList from "./PdfList";
import PDFViewer from "./PdfViewer";

const FileView = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <div>
      <FileUpload />
      <PDFList onSelect={setSelectedPdf} />
      <PDFViewer pdfUrl={selectedPdf} />
    </div>
  );
};

export default FileView;
