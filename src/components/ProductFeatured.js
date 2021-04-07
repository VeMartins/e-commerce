import React from "react";
import { formatPrice } from "../utils/helpers";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./ProductFeatured.css";

const ProductFeatured = ({ img, title, price, id }) => {
  console.log(id, "featured");
  return (
    <article>
      <div className="container">
        <div className="featured-img-container">
          <img src={img} alt={title} />
          <Link to={`/product/${id}`} className="link-product">
            <FaSearch />
          </Link>
        </div>
      </div>
      <footer className="featured-footer">
        <h5>{title}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
    </article>
  );
};

export default ProductFeatured;
