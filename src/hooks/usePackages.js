import { useState, useEffect } from "react";
import { getPackages } from "../apis/packageApi";

const useAllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchedPackages = async () => {
      try {
        const { data } = await getPackages(0, 5);
        setPackages(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchedPackages();
  }, []);

  return { packages, loading, error };
};

export default useAllPackages;
