# MERN File Upload App

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to upload images and videos to Cloudinary through the backend server and view/manage these uploads via the frontend.

## Features
- **Image/Video Upload:** Users can upload image and video files to the Cloudinary cloud storage through the backend.
- **Express.js Backend:** REST API to handle file uploads and connect with the Cloudinary service.
- **React.js Frontend:** User interface to upload files and view them.
- **MongoDB Database:** Store file metadata (optional based on requirements).
- **Cloudinary Integration:** Use Cloudinary for image and video storage.

---

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Optional for metadata storage)
- **Cloud Storage:** Cloudinary
- **Deployment:** Vercel (Frontend & Backend)

---

## Folder Structure
```
.
├── client                # Frontend (React app)
│   ├── public            # Static assets
│   ├── src               # Source files (React components, hooks)
│       ├── components    # UI components like ImageUpload, VideoUpload
│       ├── pages         # Pages like HomePage, Dashboard
│       ├── App.js        # Main React component
│       └── index.js      # React DOM rendering
├── server                # Backend (Node.js/Express.js app)
│   ├── Config            # Configuration files for database & Cloudinary
│   ├── Routes            # Express routes (file uploads)
│   ├── Controllers       # Logic for handling requests (upload, fetch)
│   ├── index.js          # Main entry point for backend server
│   └── .env              # Environment variables (DB, Cloudinary credentials)
└── README.md             # Documentation
```

---

## Prerequisites
- Node.js (v14+)
- MongoDB (optional, for file metadata storage)
- Cloudinary account (for file uploads)
- Vercel account (for deployment)

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mern-file-upload.git
cd mern-file-upload
```

### 2. Set up the Backend (Node.js/Express.js)

Navigate to the backend folder:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `server` directory and add your environment variables:

```bash
# MongoDB Connection String
MONGODB_URI=your-mongo-db-connection-string

# Cloudinary API Credentials
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret

# PORT (optional)
PORT=4000
```

Run the backend server:
```bash
npm start
```

### 3. Set up the Frontend (React.js)

Navigate to the frontend folder:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the frontend server:
```bash
npm start
```

### 4. Run the Application

Once both servers are running, you can access the frontend via:
```
http://localhost:3000
```

Make sure the backend API is running at:
```
http://localhost:4000
```

---

## Backend API

### Endpoints

- `POST /api/v1/upload/imageUpload`: Upload an image to Cloudinary.
- `POST /api/v1/upload/videoUpload`: Upload a video to Cloudinary.
- `GET /api/v1/upload`: Fetch uploaded files (optional if using MongoDB to store metadata).

### Example Image Upload Request
```bash
POST http://localhost:4000/api/v1/upload/imageUpload
```
**Body (form-data):**
```
image: <File>
```

---

## CORS Configuration

CORS is configured on the backend to allow communication between the frontend and backend, especially when deployed to different domains.

In the `server/index.js` file:
```js
app.use(cors({
  origin: 'https://file-upload-mern-9pwh.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

This ensures that the frontend (deployed on Vercel) can communicate with the backend, especially during cross-origin requests.

---

## Deployment

### Backend Deployment

Deploy the backend on platforms like Vercel or Heroku.

1. Push your code to GitHub or any version control service.
2. Connect your Vercel account to the repository and deploy the backend.
3. Add your `.env` variables in the Vercel dashboard under the "Environment Variables" section.

### Frontend Deployment

Deploy the frontend on Vercel.

1. Push the React frontend code to GitHub.
2. Connect your Vercel account to the repository and deploy the frontend.
3. Ensure the backend API URL is correct and accessible (replace localhost URLs with the Vercel-deployed backend URL).

---

## Common Issues

### 1. **CORS Error**
   - Make sure CORS is correctly configured in the backend (`index.js` file).
   - The `origin` should match your frontend URL when deployed on Vercel.

### 2. **File Not Found (404)**
   - Check the API routes in both the frontend and backend. Ensure you are sending requests to the correct URL and endpoints.

### 3. **MongoDB Connection Issues**
   - Ensure your MongoDB connection string is correct and the database is accessible. You can test the connection locally before deployment.

### 4. **Cloudinary Upload Issues**
   - Verify that your Cloudinary API credentials are correctly added to the `.env` file.
   - Ensure Cloudinary's account has sufficient storage and the correct upload preset is being used if required.

---

## Future Enhancements

- **Authentication:** Add JWT-based authentication for users to manage their own uploads.
- **Image Preview:** Display a preview of uploaded images/videos before uploading.
- **Progress Bar:** Add a progress bar to show the status of file uploads.
