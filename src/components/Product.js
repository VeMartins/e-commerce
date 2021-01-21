import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ id, title, category, price, img, desc }) => {
  return (
    <article key={id} className="item">
      <div className="img-container">
        <img src={img} alt={title} className="photo" />
      </div>
      <div className="item-info">
        <header>
          <h4>{title}</h4>
          <h4 className="price">${price}</h4>
        </header>

        <p className="item-text">{desc}</p>
        <Link to={`/item/${id}`} className="btn btn-details">
          View Details
        </Link>
      </div>
    </article>
  );
};
export default Product;
