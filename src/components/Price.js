import React from "react";

import "./Price.css";

const Price = ({ price, id, stock, sale, product }) => {
  return (
    <dl className="price-container">
      <div className="price">
        <dt>
          <span className="hidden">Regular price</span>
        </dt>
        <dd>
          <span className={sale > 0 ? "dinamic-size" : "price"}>
            {price} <small> € </small>
            <span className={sale > 0 ? "hidden" : "shipping"}>+ shipping</span>
          </span>
        </dd>
      </div>
      {sale > 0 && (
        <div className="price sale">
          <dt>
            <span className="hidden">Sale Price</span>
          </dt>
          <dd>
            <span>
              {sale}
              <small> € </small> <span className="shipping">+ shipping</span>
            </span>
          </dd>
        </div>
      )}
      <div className="stock">
        <dt>
          {product.stock > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-stock">Out of Stock</span>
          )}
        </dt>
      </div>
    </dl>
  );
};
export default Price;
