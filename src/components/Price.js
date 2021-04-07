import React from "react";
import { formatPrice } from "../utils/helpers";

import "./Price.css";

const Price = ({ price, id, stock, sale, product }) => {
  return (
    <dl className="price-container">
      <div className="price">
        <dt>
          <span className="hidden">Regular price</span>
        </dt>
        <dd>
          <span>
            {sale > 0 && (
              <span className="sale price"> {formatPrice(sale)}</span>
            )}
            <span className={sale > 0 ? "dinamic-size" : "price"}>
              {formatPrice(price)}
            </span>

            <span className={sale > 0 ? "shipping-flex" : "shipping"}>
              {" "}
              + shipping
            </span>
          </span>
        </dd>
      </div>
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
