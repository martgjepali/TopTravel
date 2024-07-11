import React from "react";
import { Link } from "react-router-dom";

function PackagesCards({ path, Country, image, PackageName, Description, Price }) {
  const defaultImage = 'path/to/default/image.jpg'; 
  const imageSrc = image?.src ? image.src : defaultImage;
  const imageTitle = image?.title || 'Default title';

  return (
    <li className="cards__item">
      <Link to={path} className="cards__item__link">
        <figure data-category={Country} className="cards__item__pic-wrap">
          <img
            src={imageSrc}
            alt={imageTitle}
            className="cards__item__img"
          />
        </figure>
        <div className="cards__item__info">
          <h5 className="cards__item__text">{PackageName}</h5>
          <p className="cards__item__text">{Description}</p>
          <h5 className="cards__item__text">Price: €{Price}</h5>
        </div>
      </Link>
    </li>
  );
}

export default PackagesCards;
