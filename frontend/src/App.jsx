// src/App.jsx
import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import VideoUpload from './components/VideoUpload';

function App() {
  const [activeTab, setActiveTab] = useState('image');

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-100 rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">File Upload Portal</h1>
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab('image')}
            className={`px-4 py-2 mx-2 rounded-md transition ${
              activeTab === 'image'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'
            }`}
          >
            Image Upload
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 mx-2 rounded-md transition ${
              activeTab === 'video'
                ? 'bg-green-600 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-green-500 hover:text-white'
            }`}
          >
            Video Upload
          </button>
        </div>
        {activeTab === 'image' ? <ImageUpload /> : <VideoUpload />}
      </div>
    </div>
  );
}

export default App;
