import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchReviewsByPackageId = async (packageId, page = 0, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/reviews/package/${packageId}?skip=${page * 10}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return null;
  }
};

export const postReview = async (reviewData) => {
  try {
    const response = await axiosInstance.post('/reviews/', reviewData);
    return response.data;
  } catch (error) {
    console.error('Failed to post review:', error);
    return null;
  }
};
