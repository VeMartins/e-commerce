import React from "react";
import { Link } from "react-router-dom";
import Price from "./Price";

import "./Product.css";

const Product = (props) => {
  const { id, title, price, img, desc, sale, product } = props;
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
            <Price price={price} id={id} product={product} sale={sale} />
          </div>
        </div>
      </Link>
    </li>
  );
};
export default Product;
