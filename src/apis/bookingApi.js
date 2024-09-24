import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createBooking = async (bookingDetails) => {
  try {
    const response = await axios.post(`${API_URL}/bookings/`, {
      UserID: bookingDetails.UserID,
      PackageID: bookingDetails.PackageID,
      Status: bookingDetails.Status,
      NumberOfPeople: bookingDetails.NumberOfPeople,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create booking:", error);
    throw error;
  }
};

export const getBookingByUser = async (userID) => {
  try {
    const response = await axios.get(`${API_URL}/user-booking-history`, {
      params: { user_id: userID },  
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching bookings for user:", error);
    throw error;
  }
};