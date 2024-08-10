import { useState } from 'react';
import { createCheckoutSession } from '../apis/stripeApi';

export const usePayment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sessionUrl, setSessionUrl] = useState('');

    const initiatePayment = async (bookingId, priceId, quantity) => {
        setLoading(true);
        setError(null);
        try {
            const session = await createCheckoutSession(bookingId, priceId, quantity);
            setSessionUrl(session.url);
            return session.url;
        } catch (err) {
            console.error('Error initiating payment:', err);
            setError(err.message || 'Failed to initiate payment');
        } finally {
            setLoading(false);
        }
    };

    return {
        initiatePayment,
        sessionUrl,
        loading,
        error,
    };
};
