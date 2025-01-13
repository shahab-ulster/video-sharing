import api from "./api";

// User signup
export const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

// User login
export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};
