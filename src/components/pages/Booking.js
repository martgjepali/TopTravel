import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUserProfile";
import usePackageById from "../../hooks/usePackageById";
import { useBooking } from "../../hooks/useBooking";
import { usePayment } from "../../hooks/usePayment";

import "./Booking.css";

const Booking = () => {
  const { profile, loading: userLoading, error: userError } = useUserProfile();
  const { packageId } = useParams(); // assuming package ID is in the URL
  const {
    packageDetails,
    loading: packageLoading,
    error: packageError,
  } = usePackageById(packageId);
  const {
    handleCreateBooking,
    loading: bookingLoading,
    error: bookingError,
  } = useBooking();
  const {
    initiatePayment,
    loading: paymentLoading,
    error: paymentError,
  } = usePayment();

  const [numberOfPeople, setNumberOfPeople] = useState(1);

  if (userLoading || packageLoading || bookingLoading || paymentLoading) {
    return <div>Loading...</div>;
  }

  if (userError || packageError || bookingError || paymentError) {
    return (
      <div>
        Error:{" "}
        {userError?.message ||
          packageError?.message ||
          bookingError?.message ||
          paymentError?.message}
      </div>
    );
  }

  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const bookingDetails = {
        UserID: profile.UserID,
        PackageID: packageDetails.PackageID,
        Status: "PENDING",
        NumberOfPeople: numberOfPeople,
      };
      const bookingResponse = await handleCreateBooking(bookingDetails);
      const bookingId = bookingResponse.BookingID;
      const priceId = packageDetails.StripePriceID;

      const paymentDetails = {
        package_id: packageDetails.PackageID,
        booking_id: bookingId,
        price_id: priceId,
        quantity: 1,
      };
      const sessionResponse = await initiatePayment(paymentDetails);
      console.log(sessionResponse)

      if (sessionResponse) {
        window.location.href = sessionResponse;
      } else {
        console.error("No URL returned from checkout session.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="row">
      <div className="col-75">
        <div className="container">
          <form onSubmit={handleCheckout}>
            {" "}
            {/* Note: Changed `htmlForm` to `form` */}
            <div className="row">
              <div className="col-50">
                <h3>Booking Details</h3>
                <label htmlFor="fname">
                  <i className="fa fa-user"></i> Full Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  value={`${profile?.FirstName} ${profile?.LastName}`}
                  readOnly
                />
                <label htmlFor="email">
                  <i className="fa fa-envelope"></i> Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={profile?.Email}
                  readOnly
                />
                <label htmlFor="adr">
                  <i className="fa fa-address-card-o"></i> Package Name
                </label>
                <input
                  type="text"
                  id="adr"
                  name="address"
                  value={
                    packageDetails?.PackageName || "Loading package details..."
                  }
                  readOnly
                />
                <label htmlFor="city">
                  <i className="fa fa-institution"></i> Number of People
                </label>
                <input
                  type="number"
                  id="numberOfPeople"
                  name="numberOfPeople"
                  value={numberOfPeople}
                  min="1"
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn"
              type="submit"
              disabled={bookingLoading || paymentLoading}
            >
              {bookingLoading || paymentLoading
                ? "Processing..."
                : "Continue to checkout"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
