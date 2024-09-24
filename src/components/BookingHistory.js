import "./BookingHistory.css";
import { useUserProfile } from "../hooks/useUserProfile";
import useBookingHistory from "../hooks/useBookingHistory";

const BookingHistory = () => {
    const { profile } = useUserProfile();

  const {
    bookings,
    loading: bookingsLoading,
    error,
  } = useBookingHistory(profile?.UserID);
  

  console.log("User ID: ", profile?.UserID);

  if (bookings.length === 0) {
    return <div>No bookings found.</div>;
  }

  return (
    <div className="container-booking">
      <h2 className="booking-header">Booking History</h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Booking Id</div>
          <div className="col col-2">Booking Date</div>
          <div className="col col-3">Status</div>
        </li>

        {bookings.map((booking) => (
          <li key={booking.BookingID} className="table-row">
            <div className="col col-1" data-label="Booking Id">
              {booking.BookingID}
            </div>
            <div className="col col-2" data-label="Booking Date">
              {new Date(booking.BookingDate).toLocaleDateString()}{" "}
            </div>
            <div className="col col-3" data-label="Status">
              {booking.Status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
