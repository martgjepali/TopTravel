import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createCheckoutSession = async (paymentDetails) => {
  try {
    const response = await axios.post(`${API_URL}/create-checkout-session`, {
      package_id: paymentDetails.package_id,
      booking_id: paymentDetails.booking_id,
      price_id: paymentDetails.price_id,
      quantity: paymentDetails.quantity
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    throw error;
  }
};
