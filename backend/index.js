const express = require("express");
const app = express();
const cors = require("cors");

// Middleware for CORS
app.use(cors({
  origin: [
    'https://file-upload-mern-9pwh.vercel.app' // Frontend server origin (React app running locally)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Enable sending cookies if needed
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// MIDDLEWARES
app.use(express.json());
const fileupload = require("express-fileupload");
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

// Routes
const Upload = require("./Routes/FileUpload");
app.use("/api/v1/upload", Upload);

// Starting the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("<h1>App working properly</h1>");
});


// // app create
// const epxress = require("express");
// const app = epxress();

// // PORT find out
// const PORT = process.env.PORT || 4000

// // MIDDLEWARE ADD
//     // 1. for parsing a body
//     app.use(epxress.json());
//     // 2. for file upload 
//     const fileupload = require("express-fileupload");
//     app.use(fileupload({
//         useTempFiles: true,
//         tempFileDir : '/tmp/'
//     }));

// // DB connection stablished
// const db = require("./Config/database");
// db.connect();

// // cloud connection stablished
// const clouldinary = require("./Config/cloudinary");
// clouldinary.cloudinaryConnect();

// // api route mount
// const Upload = require("./Routes/FileUpload");
// app.use("/api/v1/upload" , Upload);

// // activation server
// app.listen(PORT , () => {
//     console.log(`App is running at ${PORT}`);
// })

// app.get("/" , (req , res) => {
//     res.send("<h1>app working properly</h1>");
// })
