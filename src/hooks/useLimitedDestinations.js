import { useState, useEffect } from "react";
import { getDestinations } from "../apis/destinationApi";
import { useSearch } from "../contexts/SearchProvider";

const useLimitedDestinations = (skip = 0, limit = 4) => {
  const { filters } = useSearch();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const response = await getDestinations({ skip, limit, ...filters });
        const fetchedData = response.data;
        setDestinations((prev) => (skip === 0 ? fetchedData : [...prev, ...fetchedData]));
      } catch (err) {
        setError(err);
        console.error("Failed to fetch destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [skip, limit, filters]);

  return { destinations, loading, error, filters };
};

export default useLimitedDestinations;
