import { useState, useEffect } from "react";
import { getPackagesById } from "../apis/packageApi";

const usePackageById = (packageId) => {
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!packageId) {
        console.log("No package ID provided");
        setLoading(false);
        return; // early return if no package ID
      }
      try {
        console.log(`Fetching details for package ID: ${packageId}`);
        const data = await getPackagesById(packageId);
        console.log("Package details fetched:", data);
        setPackageDetails(data);
      } catch (err) {
        console.error("Error fetching package details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  return { packageDetails, loading, error };
};

export default usePackageById;
