import { useState } from "react";
import { uploadVideo } from "../services/videoService";

const UploadVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "test",
    ageRating: "G",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("genre", formData.genre);
    data.append("ageRating", formData.ageRating);
    data.append("video", file);

    try {
      const response = await uploadVideo(data);
      setMessage(response.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Upload Video
        </h2>
        <form onSubmit={handleUpload} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter video title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Comma Separated Tags
            </label>
            <textarea
              placeholder="Enter video description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Genre */}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700">
              Genre
            </label>
            <input
              type="text"
              placeholder="Enter video genre"
              value={formData.genre}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, genre: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div> */}
          {/* Age Rating */}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700">
              Age Rating
            </label>
            <input
              type="text"
              placeholder="Enter age rating (e.g., G, PG, R)"
              value={formData.ageRating}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ageRating: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div> */}
          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Video File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-purple-400"
          >
            Upload
          </button>
        </form>
        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("failed") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
