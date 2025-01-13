import api from "./api";

// Fetch all videos
export const getAllVideos = async () => {
  const response = await api.get("/videos");
  return response.data;
};

// Upload a video
export const uploadVideo = async (formData) => {
  const response = await api.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Add a comment to a video
export const addComment = async (videoId, comment) => {
  const response = await api.post(`/videos/${videoId}/comment`, comment);
  return response.data;
};

// Rate a video
export const rateVideo = async (videoId, rating) => {
  const response = await api.post(`/videos/${videoId}/rate`, rating);
  return response.data;
};
