import { useState, useEffect } from "react";
import { getBookingByUser } from "../apis/bookingApi";

const useBookingHistory = (userID) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBookings = async () => {
        setLoading(true); 
        setError(null);   
        try {
          const userBookings = await getBookingByUser(userID);
          setBookings(userBookings);
        } catch (err) {
          setError(err.message); 
        } finally {
          setLoading(false);
        }
      };
  
      if (userID) {
        fetchBookings(); 
      }
    }, [userID]);  
  
    return { bookings, loading, error };
  };
  
  export default useBookingHistory;