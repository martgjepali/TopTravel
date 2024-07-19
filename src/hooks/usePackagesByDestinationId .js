import { useState, useEffect } from 'react';
import { getPackagesByDestinationId } from '../apis/packageApi';

const usePackagesByDestinationId = (destinationId) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackagesByDestinationId(destinationId);
        console.log("Api data: " + data)
        setPackages(data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (destinationId != null) {
      fetchPackages();
    }
  }, [destinationId]);

  return { packages, loading, error };
};

export default usePackagesByDestinationId;
