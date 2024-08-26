import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const activateAccount = async ({ email, code }) => {
    try {
      const response = await axiosInstance.post("/verify-user", {email, code});
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("Something went wrong");
    }
  };