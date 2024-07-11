import React from "react";
import { Link } from "react-router-dom";

function DestinationCards({ path, Country, image, DestinationName, Description }) {
  return (
    <li className="cards__item">
      <Link to={path} className="cards__item__link">
        <figure data-category={Country} className="cards__item__pic-wrap">
          <img
            src={image.src}
            alt={image.title}
            className="cards__item__img"
          />
        </figure>
        <div className="cards__item__info">
          <h5 className="cards__item__text">{DestinationName}</h5>
          <p className="cards__item__text">{Description}</p>
        </div>
      </Link>
    </li>
  );
}

export default DestinationCards;
