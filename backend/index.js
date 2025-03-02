const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

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

// Routes for file uploads with specific CORS configuration
const Upload = require("./Routes/FileUpload");
app.use("/api/v1/upload", cors({
  origin: 'https://file-upload-mern-9pwh.vercel.app', // Only the deployed frontend
  methods: ['POST', 'OPTIONS'], // Only need POST and OPTIONS for uploads
  allowedHeaders: ['Content-Type'] // Only Content-Type is sent by frontend
}), Upload);

// Test route to verify the server is working
app.get("/", (req, res) => {
  res.send("<h1>App working properly</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

// // index.js
// const express = require("express");
// const cors = require("cors");
// const fileupload = require("express-fileupload");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Configure CORS to allow requests from your deployed frontend
// app.use(cors({
//   origin: [
//     'https://file-upload-mern-9pwh.vercel.app', // Frontend
//     'http://localhost:3000' // Local testing
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // MIDDLEWARES
// app.use(express.json());
// app.use(fileupload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/'
// }));

// // Database connection
// const db = require("./Config/database");
// db.connect();

// // Cloudinary connection
// const cloudinary = require("./Config/cloudinary");
// cloudinary.cloudinaryConnect();

// // Routes for file uploads
// const Upload = require("./Routes/FileUpload");
// app.use("/api/v1/upload", Upload);

// // Test route to verify the server is working
// app.get("/", (req, res) => {
//   res.send("<h1>App working properly</h1>");
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`App is running on port ${PORT}`);
// });
