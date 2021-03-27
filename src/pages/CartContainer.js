import React from "react";
import { Link } from "react-router-dom";

import { formatPrice } from "../utils/helpers";
import { CartItem } from "../components";
import { useCartContext } from "../context/cart-context";
import { PageHeaderImage } from "../components";
import background from "../srcImages/cesta.jpg";

import "./CartContainer.css";

const CartContainer = () => {
  const { cart, total, clearCart, amount } = useCartContext();
  if (cart.length === 0) {
    return (
      <main>
        <PageHeaderImage title="Cart" src={background} />
        <section className="cart">
          <header>
            <h4 className="empty-cart box-style-look ">
              Your cart is currently empty
              <Link to="/products">
                <span className="btn-green-dark btn"> Buy now </span>
              </Link>
            </h4>
          </header>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHeaderImage title="Cart" src={background} />
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
          <button
            className=" clear-btn btn-position btn-transparent-red"
            onClick={clearCart}
          >
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
                  <small>({amount} items)</small>{" "}
                </span>
              </p>
              <button className="btn btn-green-dark">Go to checkout</button>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default CartContainer;
