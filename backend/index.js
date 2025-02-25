const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const db = require("./Config/database");
const cloudinary = require("./Config/cloudinary");
const Upload = require("./Routes/FileUpload");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for CORS configuration
app.use(cors({
  origin: 'https://file-upload-mern-9pwh.vercel.app', // Frontend URL on Vercel (ensure it's the correct one)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials if needed
  allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));

// Middleware for additional CORS headers (this helps avoid preflight issues)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://file-upload-mern-9pwh.vercel.app'); // Allow your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for file uploads using express-fileupload
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/' // Temporary directory for storing uploads
}));

// Connect to the database
db.connect();

// Connect to Cloudinary for image/video handling
cloudinary.cloudinaryConnect();

// Route for file uploads
app.use("/api/v1/upload", Upload);

// Root route for testing the app
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
// const corsOptions = {
//   origin: [
//     'https://file-upload-mern-9pwh.vercel.app' // Deployed React frontend URL
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization']
// };
// app.use(cors(corsOptions));

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
