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

  // Use the secureUrl function to adjust the API URL if necessary
  const response = await axios.get(secureUrl(`${API_URL}/destinations`), { params });
  console.log("API URL:", API_URL);  // This will help you debug the actual API URL used in requests
  
  return {
    data: response.data,
    total: parseInt(response.headers["x-total-count"], 10),
  };
};
