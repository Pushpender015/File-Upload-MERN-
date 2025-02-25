// src/components/ImageUpload.jsx
import { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [email, setEmail] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setUploadProgress(0);
    setMessage('');
    setUploadedUrl('');
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('name', name);
    formData.append('tags', tags);
    formData.append('email', email);

    try {
      const response = await axios.post('https://file-upload-mern.vercel.app/api/v1/upload/imageUpload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });
      setMessage(response.data.message);
      setUploadedUrl(response.data.fileUrl);
    } catch (error) {
      setMessage(
        (error.response && error.response.data.message) || 'Image upload failed!'
      );
    }
    // again all empty
    setName('');
    setEmail('');
    setTags('');
    setImageFile(null);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Image Upload</h3>
      <form onSubmit={handleImageUpload} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Image File</label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/*"
            className="p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
        >
          Upload Image
        </button>
      </form>

      {uploadProgress > 0 && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      {message && <p className="mt-2 text-center text-red-500">{message}</p>}
      {uploadedUrl && (
        <a
          href={uploadedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-center text-green-600 underline"
        >
          View Uploaded Image
        </a>
      )}
    </div>
  );
}

export default ImageUpload;
