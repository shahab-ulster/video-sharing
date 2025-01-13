import axios from "axios";

// Create an Axios instance
const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://share-videos.azurewebsites.net",
  // baseURL: "https://tiktok-clone-ezd2ftgvc3etfzch.canadacentral-01.azurewebsites.net", // Ensure full URL
});

// Add Authorization Token Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assume token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
