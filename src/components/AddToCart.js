import React, { useRef } from "react";

import { useCartContext } from "../context/cart-context";
import { useGlobalContext } from "../context/products-context";

const AddToCart = ({ id, stock, product }) => {
  const quantityRef = useRef(null);
  const { addToCart, cart } = useCartContext();
  const { hasError } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = parseInt(quantityRef.current.value);
    let cartItem = cart.find((cartItem) => cartItem.id === id);

    if (cartItem) {
      let itemStock = cartItem.max - cartItem.amount;
      if (quantity > itemStock) {
        hasError(true);
      }
    }
    if (quantity > stock) {
      quantityRef.current.value = stock;
    } else {
      addToCart(product, quantity, id);
    }
  };

  return (
    <form className="details-form" onSubmit={handleSubmit}>
      <div className="quantity">
        <label htmlFor="quantity">Quantity</label>
        <input
          ref={quantityRef}
          type="number"
          id="quantity"
          min="1"
          max={stock}
          defaultValue="1"
        ></input>
      </div>
      <div className="add-cart">
        <button
          className="btn-green-dark add-cart-btn"
          type="submit"
          disabled={stock <= 0 ? "disabled" : ""}
        >
          <span>Add to cart</span>
        </button>
      </div>
    </form>
  );
};
export default AddToCart;
