import React from "react";

import CartItem from "../components/CartItem";
import { useGlobalContext } from "../context";

import "./CartContainer.css";

const CartContainer = () => {
  const { cart, total, clearCart, totalAmount } = useGlobalContext();
  if (cart.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart box-style-look">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>

      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <div>
        <button className=" clear-btn btn-position" onClick={clearCart}>
          clear cart
        </button>
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total{" "}
            <span>
              {total} <small>€</small>
            </span>
          </h4>
        </div>
        <div className="cart__checkout">
          <div className="checkout">
            <p>
              Total:{" "}
              <span>
                {total}
                <small>€</small>
              </span>{" "}
              <span>
                <small>({totalAmount} items)</small>{" "}
              </span>
            </p>
            <button className="btn btn-details">Go to checkout</button>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;
