import { useState, useEffect } from "react";
import { getDestinations } from "../apis/destinationApi";

const useAllDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data } = await getDestinations();
        setDestinations(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDestinations();
  }, []);
  
  return { destinations, loading, error };
};

export default useAllDestinations;
