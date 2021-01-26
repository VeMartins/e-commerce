import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ id, title, price, img, desc }) => {
  return (
    <li className="content-item item-width ">
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
                <span>€ {price}</span>
              </dd>
            </div>
            <div className="sale hidden">
              <dt>
                <span>Sale Price</span>
              </dt>
              <dd>
                <span></span>
              </dd>
            </div>
          </dl>
          <div>
            <Link to={`/item/${id}`} className="btn btn-details">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};
export default Product;
/*<article key={id} className="item">
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
 </article>;*/
