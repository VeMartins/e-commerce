import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

import { Loading, ErrorModal, PageHeaderImage } from "../components";

import { formatPrice } from "../utils/helpers";
import { useOrderContext, useSigninContext } from "../context";
import axios from "axios";

const OrderDetails = () => {
  const { orderId } = useParams();

  const [sdkReady, setSdkReady] = useState(false);
  const {
    loading: loadingDetails,
    error: errorDetails,
    detailsOrder,
    orderDetails,
    payOrder,
    success: successPay,
    error: errorPay,
    loading: loadingPay,
    success: successDelivery,
    orderReset,
    deliverOrder,
  } = useOrderContext();

  const { userInfo } = useSigninContext();

  const { order } = orderDetails;
  const {
    shippingAddress,
    orderItems,
    isPaid,
    isDelivered,
    _id,
    paymentMethod,
    total,
    shippingPrice,
    tax,
    totalPrice,
    deliveredAt,
    paidAt,
  } = order;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!_id || successPay || successDelivery || (order && _id !== orderId)) {
      detailsOrder(orderId);
      orderReset();
    } else {
      if (!isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, orderDetails, sdkReady]);

  const successPaymentHandler = (paymentResult) => {
    payOrder(order, paymentResult);
  };

  return (
    <main>
      <PageHeaderImage title={`Order ${orderId}`} colorStyle />
      <section className=" section-checkout">
        {loadingDetails && <Loading />}
        {errorDetails && (
          <ErrorModal
            header="Oops cannot find order"
            error={errorDetails}
            className="signin-error"
            style={{ position: "initial" }}
          />
        )}

        <div className="row top order-margin">
          <div className="col-2">
            <ul>
              <li>
                <div className="order-card-style order-card-body">
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {shippingAddress.fullName} <br />
                    <strong> Address: </strong>
                    {shippingAddress.address}, {shippingAddress.city},{" "}
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </p>
                  <p>
                    <strong>Delivery Status: </strong>

                    {isDelivered ? (
                      <span className="success">
                        {" "}
                        Delivered at {deliveredAt}
                      </span>
                    ) : (
                      <span className="not-success">Not Delivered</span>
                    )}
                  </p>
                </div>
              </li>
              <li>
                <div className="order-card-style order-card-body">
                  <h2>Payment</h2>
                  <p>
                    <strong>Method: </strong> {paymentMethod}
                  </p>
                  <p>
                    <strong>Payment Status: </strong>

                    {isPaid ? (
                      <span className="success"> Paid at {paidAt}</span>
                    ) : (
                      <span className="not-success">Not Paid</span>
                    )}
                  </p>
                </div>
              </li>
              <li>
                <div className="order-card-style order-card-body">
                  <h2>Order Items</h2>
                  {orderItems.map((item) => {
                    return (
                      <article key={item._id} className="cart-item">
                        <Link to="/">
                          <img src={item.image} alt={item.name} />
                        </Link>
                        <div>
                          <h4>{item.name}</h4>

                          <h4>
                            {item.amount} x{" "}
                            {`${
                              item.sale > 0
                                ? formatPrice(item.sale)
                                : formatPrice(item.price)
                            }`}{" "}
                            ={" "}
                            {formatPrice(
                              item.amount *
                                `${item.sale > 0 ? item.sale : item.price}`
                            )}
                          </h4>
                        </div>
                      </article>
                    );
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
                    <div>Sub-Total</div>
                    <div>{formatPrice(total)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping</div>
                    <div>{formatPrice(shippingPrice)}</div>
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
                {!isPaid && (
                  <li>
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <>
                        {errorPay && (
                          <ErrorModal
                            error={errorPay}
                            className="signin-error"
                            style={{ position: "initial" }}
                          />
                        )}
                        {loadingPay && <Loading />}
                        <PayPalButton
                          amount={(totalPrice / 100).toFixed(2)}
                          onSuccess={successPaymentHandler}
                        />
                      </>
                    )}
                  </li>
                )}
                {userInfo.isAdmin && isPaid && !isDelivered && (
                  <button
                    type="button"
                    className="btn-green-dark btn-center btn btn-order"
                    onClick={() => deliverOrder(orderId)}
                  >
                    Deliver
                  </button>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
