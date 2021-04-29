import React from "react";
import { formatPrice } from "../utils/helpers";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./ProductFeatured.css";

const ProductFeatured = ({ img, title, price, _id, sale }) => {
  return (
    <article>
      <div className="container">
        <div className="featured-img-container">
          <img src={img} alt={title} />
          <Link to={`/product/${_id}`} className="link-product">
            <FaSearch />
          </Link>
        </div>
      </div>
      <footer className="featured-footer">
        <h5>{title}</h5>
        <p>{sale > 0 ? formatPrice(sale) : formatPrice(price)}</p>
      </footer>
    </article>
  );
};

export default ProductFeatured;
