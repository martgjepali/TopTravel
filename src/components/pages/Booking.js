import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUserProfile";
import usePackageById from "../../hooks/usePackageById";
<<<<<<< HEAD
import { useBooking } from "../../hooks/useBooking";
import { usePayment } from "../../hooks/usePayment";
=======
>>>>>>> a0463ba8797d9697fec70dd63374df3fe26025ae

import "./Booking.css";

const Booking = () => {
<<<<<<< HEAD
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
=======
  const { profile, loading, error } = useUserProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div class="row">
      <div class="col-75">
        <div class="container">
          <htmlForm action="/action_page.php">
            <div class="row">
              <div class="col-50">
                <h3>Billing Address</h3>
                <label htmlFor="fname"><i class="fa fa-user"></i> Full Name</label>
                <input type="text" id="fname" name="firstname" value={profile.FirstName + ' ' + profile.LastName} readOnly />
                <label htmlFor="email"><i class="fa fa-envelope"></i> Email</label>
                <input type="text" id="email" name="email" value={profile.Email} readOnly />
                <label htmlFor="adr"><i class="fa fa-address-card-o"></i> Address</label>
                <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" />
                <label htmlFor="city"><i class="fa fa-institution"></i> City</label>
                <input type="text" id="city" name="city" placeholder="New York" />
                <div class="row">
                  <div class="col-50">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" placeholder="NY" />
                  </div>
                  <div class="col-50">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" id="zip" name="zip" placeholder="10001" />
                  </div>
                </div>
              </div>
              <div class="col-50">
                <h3>Payment</h3>
                <label htmlFor="fname">Accepted Cards</label>
                <div class="icon-container">
                  <i class="fa fa-cc-visa"></i>
                  <i class="fa fa-cc-amex"></i>
                  <i class="fa fa-cc-mastercard"></i>
                  <i class="fa fa-cc-discover"></i>
                </div>
                <label htmlFor="cname">Name on Card</label>
                <input type="text" id="cname" name="cardname" placeholder="John More Doe" />
                <label htmlFor="ccnum">Credit card number</label>
                <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                <label htmlFor="expmonth">Exp Month</label>
                <input type="text" id="expmonth" name="expmonth" placeholder="September" />
                <div class="row">
                  <div class="col-50">
                    <label htmlFor="expyear">Exp Year</label>
                    <input type="text" id="expyear" name="expyear" placeholder="2018" />
                  </div>
                  <div class="col-50">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" placeholder="352" />
                  </div>
                </div>
              </div>
            </div>
            <label>
              <input type="checkbox" defaultChecked={true} name="sameadr" /> Shipping address same as billing
            </label>
            <input type="submit" value="Continue to checkout" class="btn" />
          </htmlForm>
        </div>
      </div>
      <div class="col-25">
        <div class="container">
          <h4>Cart
            <span class="price">
              <i class="fa fa-shopping-cart"></i>
              <b>4</b>
            </span>
          </h4>
          <p><a href="#">Product 1</a> <span class="price">$15</span></p>
          <p><a href="#">Product 2</a> <span class="price">$5</span></p>
          <p><a href="#">Product 3</a> <span class="price">$8</span></p>
          <p><a href="#">Product 4</a> <span class="price">$2</span></p>
          <hr />
          <p>Total <span class="price"><b>$30</b></span></p>
>>>>>>> a0463ba8797d9697fec70dd63374df3fe26025ae
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
=======

>>>>>>> a0463ba8797d9697fec70dd63374df3fe26025ae
export default Booking;
