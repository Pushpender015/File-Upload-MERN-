// index.js
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configure CORS to allow requests from your deployed frontend
const corsOptions = {
  origin: [
    'https://file-upload-mern-9pwh.vercel.app' // Deployed React frontend URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Add all the required methods
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version']
};

app.use(cors(corsOptions));
// Explicitly handle preflight OPTIONS requests
app.options("*", cors(corsOptions));


// MIDDLEWARES
app.use(express.json());
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Database connection
const db = require("./Config/database");
db.connect();

// Cloudinary connection
const cloudinary = require("./Config/cloudinary");
cloudinary.cloudinaryConnect();

// Routes for file uploads
const Upload = require("./Routes/FileUpload");
app.use("/api/v1/upload", Upload);

// Test route to verify the server is working
app.get("/", (req, res) => {
  res.send("<h1>App working properly</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
