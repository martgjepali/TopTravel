import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUserProfile";
import usePackageById from "../../hooks/usePackageById";

import "./Booking.css";

const Booking = () => {
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
        </div>
      </div>
    </div>
  );
};


export default Booking;
