import { useState } from 'react';
import { createBooking } from '../apis/bookingApi'; 

export const useBooking = () => {
    const [bookingDetails, setBookingDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateBooking = async (details) => {
        setLoading(true);
        setError(null);
        try {
            const data = await createBooking(details);
            setBookingDetails(data);
            return data; 
        } catch (err) {
            console.error('Error creating booking:', err);
            setError(err.message || 'Failed to create booking');
        } finally {
            setLoading(false);
        }
    };

    return {
        bookingDetails,
        setBookingDetails,
        handleCreateBooking,
        loading,
        error,
    };
};
