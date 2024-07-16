import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:8000';

export const getDestinations = async ({ skip = 0, limit = 10, destinationName, startDate, endDate } = {}) => {
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

  const response = await axios.get(`${API_URL}/destinations`, { params });
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'], 10)
  };
};
