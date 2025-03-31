import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";
import passport from "passport";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import "./config/passportConfig.js"; // Google OAuth Config
import { GoogleGenAI } from "@google/genai";
// importing genai
import {
  BlobServiceClient,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(passport.initialize());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Azure Blob Storage Setup
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
  new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT,
    process.env.AZURE_STORAGE_KEY
  )
);

const upload = multer({ storage: multer.memoryStorage() });

// Generate Signed URL
const generateSignedUrl = (blobName) => {
  const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
  const blobClient = containerClient.getBlobClient(blobName);

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 60); // 1 hour expiry

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: process.env.AZURE_CONTAINER_NAME,
      blobName: blobName,
      permissions: BlobSASPermissions.parse("r"), // Read-only
      expiresOn: expiryDate,
    },
    new StorageSharedKeyCredential(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_KEY)
  ).toString();

  return `${blobClient.url}?${sasToken}`;
};

// 📌 Upload PDF & Store in Azure
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
    const blobClient = containerClient.getBlockBlobClient(req.file.originalname);

    await blobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });

    res.json({ url: generateSignedUrl(req.file.originalname) });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// 📌 Get All Uploaded Files
app.get("/files", async (req, res) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
    let fileUrls = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      fileUrls.push({
        name: blob.name,
        url: generateSignedUrl(blob.name),
      });
    }

    res.json(fileUrls);
  } catch (error) {
    console.error("File Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

// 📌 Extract Text from Azure PDF
const extractTextFromAzurePDF = async (blobName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
    const blobClient = containerClient.getBlobClient(blobName);

    // Download the file
    const downloadResponse = await blobClient.download();
    const chunks = [];

    for await (const chunk of downloadResponse.readableStreamBody) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const data = await pdfParse(buffer);

    return data.text;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    return null;
  }
};

// 📌 API to Extract Text from a PDF in Azure
app.get("/extract-text/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const text = await extractTextFromAzurePDF(filename);

    if (!text) {
      return res.status(500).json({ error: "Failed to extract text" });
    }

    // Summarise the text
    console.log(text);
    const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);
    
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `summarise this text: ${text}`,
      });
      console.log("Summary:");
      console.log(response.text);
      res.json({ summary: response.text });
      
      
   
    
    
    
    // res.json({ summary });
  } catch (error) {
    console.error("Extract Text Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
