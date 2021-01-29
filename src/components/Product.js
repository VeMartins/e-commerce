import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ id, title, price, img, desc }) => {
  return (
    <li className="content-item item-width ">
      <Link to={`/${title}/${id}`}>
        <div className="item-inner-container item-style">
          <div className="img-container">
            <div className="img-inner-container">
              <img src={img} alt={title} className="item-photo" />
            </div>
          </div>
          <div className="info-container">
            <div className="item-title">{title}</div>
            <p>{desc}</p>
            <dl className="price-container">
              <div className="price">
                <dt>
                  <span className="hidden">Regular price</span>
                </dt>
                <dd>
                  <span> {price}€</span>
                </dd>
              </div>
              <div className="sale price hidden">
                <dt>
                  <span>Sale Price</span>
                </dt>
                <dd>
                  <span> {price}€ </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default Product;
