import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import passport from "passport";
import "./config/passportConfig.js";// Import Google OAuth configuration
import cors from "cors";
import multer from "multer";
import { BlobServiceClient, BlobSASPermissions, generateBlobSASQueryParameters, StorageSharedKeyCredential } from "@azure/storage-blob";

dotenv.config();


const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parse urlencoded bodies in the request form data
app.use(cookieParser()); //parse cookies from the request
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(passport.initialize()); // Initialize Passport


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
});





const upload = multer({ storage: multer.memoryStorage() });

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
  new StorageSharedKeyCredential(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_KEY)
);

// Generate a Signed URL for Secure Access
const generateSignedUrl = (blobName) => {
  const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
  const blobClient = containerClient.getBlobClient(blobName);

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 60); // Expires in 60 mins

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: process.env.AZURE_CONTAINER_NAME,
      blobName: blobName,
      permissions: BlobSASPermissions.parse("r"), // Read-only permission
      expiresOn: expiryDate,
    },
    new StorageSharedKeyCredential(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_KEY)
  ).toString();

  return `${blobClient.url}?${sasToken}`;
};

// Upload File API
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
    const blobClient = containerClient.getBlockBlobClient(req.file.originalname);
    
    await blobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });

    res.json({ url: generateSignedUrl(req.file.originalname) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Get Signed URLs for All Files
app.get("/files", async (req, res) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);
    let fileUrls = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      fileUrls.push({
        name: blob.name,
        url: generateSignedUrl(blob.name)
      });
    }

    res.json(fileUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

