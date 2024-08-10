import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUser = async (user) => {
  try {
    const response = await axiosInstance.post("/users/create", user);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

export async function login(email, password) {
  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function logout(token) {
  const response = await fetch(`${API_URL}/logout?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return response.json();
}

export async function resetPassword(email) {
  try {
    const response = await axiosInstance.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
}

export const resetForgetPassword = async (secret_token, new_password, confirm_password) => {
  try {
    const response = await axiosInstance.post('/reset-password', {
      secret_token,
      new_password,
      confirm_password
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Something went wrong');
  }
};
