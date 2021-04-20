import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import { formatPrice } from "../utils/helpers";
import { useCartContext } from "../context/cart-context";

import "./CartItem.css";

const CartItem = ({ id, image, name, price, amount, sale, orderPage }) => {
  const { removeItem, increaseItem, decreaseItem } = useCartContext();
  return (
    <article className="cart-item">
      <Link to="/">
        <img src={`${image}`} alt={name} />
      </Link>
      <div>
        <h4>{name}</h4>
        {orderPage && (
          <h4>
            {amount} x {`${sale > 0 ? formatPrice(sale) : formatPrice(price)}`}{" "}
            = {formatPrice(amount * `${sale > 0 ? sale : price}`)}
          </h4>
        )}
        {!orderPage && (
          <h4 className="item-price">{`${
            sale > 0 ? formatPrice(sale) : formatPrice(price)
          }`}</h4>
        )}
        {/* remove button */}
        {!orderPage && (
          <button
            className="remove-btn clear-btn btn-transparent-red"
            onClick={() => removeItem(id)}
          >
            <FaTrash />
          </button>
        )}
      </div>
      {!orderPage && (
        <div>
          {/* increase amount */}
          <button className="amount-btn" onClick={() => increaseItem(id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
            </svg>
          </button>
          {/* amount */}
          <p className="amount">{amount}</p>
          {/* decrease amount */}
          <button className="amount-btn" onClick={() => decreaseItem(id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
        </div>
      )}
    </article>
  );
};

export default CartItem;
