import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Loading, ErrorModal, CartItem, CheckoutSteps } from "../components";

import { formatPrice } from "../utils/helpers";
import { useOrderContext } from "../context/order-context";
import { useCartContext } from "../context/cart-context";

const PlaceOrder = () => {
  const history = useHistory();
  const {
    shippingAddress,
    paymentMethod,
    shippingPrice,
    taxPercentage,
    createOrder,
    loading,
    error,
    success,
    order,
    orderReset,
    orderItems,
  } = useOrderContext();
  const { cart, total, amount } = useCartContext();

  //if total amount is > 100 then shipping is free
  const shipping = total > 10000 ? 0 : shippingPrice;
  const tax = taxPercentage * total;
  const totalPrice = shipping + total;

  const placeOrderHandler = () => {
    createOrder({
      ...order,
      shippingAddress,
      orderItems,
      paymentMethod,
      total,
      shippingPrice,
      tax,
      totalPrice,
    });
  };
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      orderReset();
    }
  }, [success, history, order, orderReset]);
  return (
    <section className=" section-checkout">
      <div className="checkout-steps-wrapper">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className="row top order-margin">
        <div className="col-2">
          <ul>
            <li>
              <div className="order-card-style order-card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {shippingAddress.fullName} <br />
                  <strong> Address: </strong> {shippingAddress.address},
                  {shippingAddress.city}, {shippingAddress.postalCode},
                  {shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="order-card-style order-card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong> {paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="order-card-style order-card-body">
                <h2>Order Items</h2>
                {cart.map((item) => {
                  return <CartItem key={item.id} {...item} orderPage />;
                })}
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="order-card-style order-card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>{amount}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Sub-Total</div>
                  <div>{formatPrice(total)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>{formatPrice(shipping)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>{formatPrice(tax)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>{formatPrice(totalPrice)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  className="btn btn-green-dark btn-center btn-order"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <Loading />}
              {error && (
                <ErrorModal
                  header="Something went wrong with order"
                  error={error}
                  className="signin-error"
                  style={{ position: "initial" }}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
