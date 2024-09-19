import user1 from "../../assets/user-1.jpg";
import user2 from "../../assets/user-2.jpg";
import user3 from "../../assets/user-3.jpg";
import Footer from "../Footer";

import "./Testimonials.css";

export default function Testimonials() {
  return (
    <>
      <section class="section__container">
        <h2>Testimonials</h2>
        <h1>What our customers say</h1>
        <div class="section__grid">
          <div class="section__card">
            <span>
              <i class="ri-double-quotes-l"></i>
            </span>
            <h4>Love the simplicity</h4>
            <p>
              They understood our brand and created a stunning website design.
              Professional, responsive, and on-time delivery. Highly
              recommended!
            </p>
            <img src={user1} alt="user" />
            <h5>Allan Collins</h5>
            <h6>Managing Director</h6>
          </div>
          <div class="section__card">
            <span>
              <i class="ri-double-quotes-l"></i>
            </span>
            <h4>Excellent Designs</h4>
            <p>
              Efficient, reliable, and results-oriented. Visually appealing
              website, improved online visibility. Highly recommended!
            </p>
            <img src={user2} alt="user" />
            <h5>Tanya Grant</h5>
            <h6>Ceo & Founder</h6>
          </div>
          <div class="section__card">
            <span>
              <i class="ri-double-quotes-l"></i>
            </span>
            <h4>Efficient and Reliable</h4>
            <p>
              Best decision we made. Stunning website, exceptional support.
              Always available and prompt issue resolution. Hassle-free
              experience!
            </p>
            <img src={user3} alt="user" />
            <h5>Clay Washington</h5>
            <h6>Fashion Designer</h6>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
