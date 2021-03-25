import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Price } from "./";
import ImgNotAvailable from "../srcImages/product_image_not_available.png";

import "./Product.css";

const Product = (props) => {
  const { id, title, price, img, sale, product } = props;
  return (
    <li>
      <Link to={`/products/${id}`}>
        <div className="item-inner-container item-style">
          <div className="img-container">
            <div className="img-inner-container">
              <img src={img} alt={title} className="item-photo" />
            </div>
          </div>
          <div className="info-container">
            <div className="item-title">{title}</div>

            <Price price={price} id={id} product={product} sale={sale} />
          </div>
        </div>
      </Link>
    </li>
  );
};
Product.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  thumbnail2: PropTypes.string.isRequired,
  thumbnail1: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  sale: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};
Product.defaultProps = {
  //id: no default
  title: "No name available",
  category: "all",
  price: 35,
  img: ImgNotAvailable,
  detail: "no product detail available",
  thumbnail2: ImgNotAvailable,
  thumbnail1: ImgNotAvailable,
  stock: 0,
  sale: 35,
  amount: 0,
};
export default Product;
