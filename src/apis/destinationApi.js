import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Function to ensure URLs use HTTPS
const secureUrl = (url) => {
  return url.replace(/^http:/, 'https:');
}

export const getDestinations = async ({
  skip = 0,
  limit = 10,
  destinationName,
  startDate,
  endDate,
} = {}) => {
  const params = {
    skip,
    limit,
  };

  if (destinationName) {
    params.destination_name = destinationName;
  }
  if (startDate) {
    params.start_date = startDate;
  }
  if (endDate) {
    params.end_date = endDate;
  }

  try {
    const response = await axios.get(`${API_URL}/destinations`, { params });
    return {
      data: response.data,
      total: parseInt(response.headers['x-total-count'], 10)
    };
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error; 
  }
};
