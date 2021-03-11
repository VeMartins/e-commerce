import React from "react";
import { Link } from "react-router-dom";

import { formatPrice } from "../utils/helpers";
import { CartItem } from "../components";
import { useGlobalContext } from "../context/context";
import PageHeader from "../components/shared/PageHeader";

import "./CartContainer.css";

const CartContainer = () => {
  const { cart, total, clearCart, totalAmount } = useGlobalContext();
  if (cart.length === 0) {
    return (
      <main>
        <PageHeader title="Cart" />
        <section className="cart">
          <header>
            <h4 className="empty-cart box-style-look radius">
              Your cart is currently empty
              <Link to="/">
                <span className="btn-details btn"> Buy now </span>
              </Link>
            </h4>
          </header>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHeader title="Cart" />
      <section className="cart">
        <header className="cart-header">
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
              total <span>{formatPrice(total)}</span>
            </h4>
          </div>
          <div className="cart__checkout">
            <div className="checkout">
              <p>
                Total: <span>{formatPrice(total)}</span>{" "}
                <span>
                  <small>({totalAmount} items)</small>{" "}
                </span>
              </p>
              <button className="btn btn-details">Go to checkout</button>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default CartContainer;
