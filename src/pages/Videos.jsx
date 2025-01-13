import { useEffect, useState } from "react";
import { getAllVideos, addComment, rateVideo } from "../services/videoService";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const data = await getAllVideos();
        const videosWithFields = data.map((video) => ({
          ...video,
          comment: "",
          rating: 0,
        }));
        setVideos(videosWithFields);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleComment = async (videoId, text) => {
    try {
      const response = await addComment(videoId, { text });
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId
            ? {
                ...video,
                comments: [...video.comments, { text }],
                comment: "",
              }
            : video
        )
      );
      setMessage(response.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add comment.");
    }
  };

  const handleRating = async (videoId, rating) => {
    try {
      const response = await rateVideo(videoId, { rating });
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId
            ? {
                ...video,
                ratings: [...video.ratings, rating],
                rating: 0,
              }
            : video
        )
      );
      setMessage(response.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add rating.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Videos
      </h2>
      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <div className="space-y-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-6 space-y-4 md:space-y-0 md:space-x-6"
          >
            <div className="md:w-1/3">
              <video
                controls
                className="w-full h-auto rounded-lg shadow-lg border"
              >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800">
                Title: {video.title}
              </h3>
              <p className="text-gray-600">Tags: {video.description}</p>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800">Comments:</h4>
                <div className="space-y-2">
                  {video.comments?.length > 0 ? (
                    video.comments.map((comment, idx) => (
                      <p key={idx} className="text-gray-700">
                        - {comment.text}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>
                <textarea
                  placeholder="Add a comment"
                  value={video.comment}
                  onChange={(e) =>
                    setVideos((prevVideos) =>
                      prevVideos.map((v) =>
                        v._id === video._id
                          ? { ...v, comment: e.target.value }
                          : v
                      )
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                  onClick={() => handleComment(video._id, video.comment)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  Comment
                </button>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800">
                  Rate This Video:
                </h4>
                <div className="flex items-center space-x-3 mt-2">
                  <input
                    type="number"
                    value={video.rating}
                    min="1"
                    max="5"
                    onChange={(e) =>
                      setVideos((prevVideos) =>
                        prevVideos.map((v) =>
                          v._id === video._id
                            ? {
                                ...v,
                                rating: Math.min(
                                  Math.max(e.target.value, 1),
                                  5
                                ),
                              }
                            : v
                        )
                      )
                    }
                    className="w-16 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                  <button
                    onClick={() => handleRating(video._id, video.rating)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  >
                    Rate
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  Average Rating:{" "}
                  {video.ratings?.length > 0
                    ? (
                        video.ratings.reduce((sum, rating) => sum + rating, 0) /
                        video.ratings.length
                      ).toFixed(1)
                    : "No ratings yet"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
