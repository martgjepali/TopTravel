import { useState, useEffect } from 'react';
import { getPackagesById } from '../apis/packageApi';

const usePackageById = (packageId) => {
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const data = await getPackagesById(packageId);
        setPackageDetails(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (packageId) {
      fetchPackageDetails();
    }
  }, [packageId]);

  return { packageDetails, loading, error };
};

export default usePackageById;
