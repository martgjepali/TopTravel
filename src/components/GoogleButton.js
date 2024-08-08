import "./GoogleButton.css";

const GoogleButton = ({ onClick, children }) => {
  return (
    <button class="button btn-google" type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default GoogleButton;
