import fs from 'fs';
import pdfParse from 'pdf-parse';


export const extractTextFromPDF = async (pdfPath) => {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
};

// Example usage
extractTextFromPDF('../../../uploads/1743097901359-bitcoin.pdf').then(text => console.log(text));
