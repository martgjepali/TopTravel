import Footer from "../Footer";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <>
      <div className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <h3>Step 1: Choose Your Destination</h3>
            <p>
              Browse through our extensive list of destinations and choose the
              perfect location for your next adventure. Use our search and
              filter tools to narrow down your options based on your preferences
              and budget.
            </p>
          </div>
          <div className="step">
            <h3>Step 2: Customize Your Trip</h3>
            <p>
              Customize your itinerary by selecting the experiences and
              activities that excite you the most. Our platform allows you to
              build your trip exactly how you want it, with real-time pricing
              and availability information.
            </p>
          </div>
          <div className="step">
            <h3>Step 3: Book and Pay Securely</h3>
            <p>
              Once you’re satisfied with your itinerary, proceed to booking. Our
              secure payment system ensures your data is safe. You can choose to
              pay all at once or in installments, depending on what suits you
              best.
            </p>
          </div>
          <div className="step">
            <h3>Step 4: Enjoy Your Trip</h3>
            <p>
              After booking, you'll receive all the necessary information for
              your trip, including tickets, travel guides, and a detailed
              itinerary. Our customer support team is always available to help
              you with any questions or issues during your journey.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorks;
