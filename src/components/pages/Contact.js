import "./Contact.css";

const Contact = () => {
  return (
    <div>
      <h3 className="contact-title">Contact Us</h3>
      <form className="contact-form">
        <input
          name="name"
          type="text"
          className="feedback-input"
          placeholder="Name"
        />
        <input
          name="email"
          type="text"
          className="feedback-input"
          placeholder="Email"
        />
        <textarea
          name="text"
          className="feedback-input"
          placeholder="Comment"
        ></textarea>
        <input className="contact-btn" type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};

export default Contact;
