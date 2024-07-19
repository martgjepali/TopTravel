import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserById = async (user_id) => {
  try {
    const response = await axiosInstance.get(`/users/${user_id}`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
