import { useState, useEffect } from "react";
import { fetchReviewsByPackageId, postReview } from "../apis/reviewApi";
import { toast } from "react-toastify";

const useReviews = (packageId) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      const data = await fetchReviewsByPackageId(packageId);
      if (data) {
        setReviews(data.reviews);
        setAverageRating(data.average_rating);
      }
      setIsLoading(false);
    };

    loadReviews();
  }, [packageId]);

  const addReview = async (review) => {
    const newReview = await postReview(review);
    if (newReview) {
      setReviews([...reviews, newReview]);
      toast.success("Review added successfully!");
      // Recalculate average rating if needed
    } else {
      toast.error("Failed to add review.");
    }
  };

  return { reviews, averageRating, addReview, isLoading };
};

export default useReviews;
