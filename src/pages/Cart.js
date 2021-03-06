import React from "react";
import { Link, useHistory } from "react-router-dom";

import { formatPrice } from "../utils/helpers";
import { CartItem } from "../components";
import { useCartContext } from "../context/cart-context";
import { PageHeaderImage } from "../components";
import background from "../srcImages/cesta.jpg";

import "./Cart.css";

const Cart = () => {
  const { cart, total, clearCart, amount } = useCartContext();
  const history = useHistory();
  const checkoutHandler = () => {
    //history.push("/signin");
    history.push("/signin?redirect=checkout");
  };
  if (cart.length === 0) {
    return (
      <main>
        <PageHeaderImage
          title="Cart"
          src={background}
          link={<Link to="/products">Products / </Link>}
        />
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
      <PageHeaderImage
        title="Cart"
        src={background}
        link={<Link to="/products">Products / </Link>}
      />
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
              <button
                type="button"
                className="btn btn-green-dark"
                onClick={checkoutHandler}
              >
                Go to checkout
              </button>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default Cart;
