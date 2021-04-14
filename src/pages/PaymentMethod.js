import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useOrderContext } from "../context/order-context";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const { savePaymentMethod } = useOrderContext();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    history.push("/placeorder");
  };
  return (
    <section className=" section-checkout">
      <div className="checkout-steps-wrapper">
        <CheckoutSteps step1 step2 step3 />
      </div>
      <div className="signin">
        <form className="signin-form" onSubmit={handleSubmit}>
          <div>
            <h2 className="checkout-title">Payment Method</h2>
          </div>
          <div>
            <div>
              <div>
                <label htmlFor="paypal" className="radio-label">
                  PayPal
                </label>
                <input
                  type="radio"
                  id="paypal"
                  value="PayPal"
                  name="paymentMethod"
                  required
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="stripe" className="radio-label">
                  Other payment method
                </label>
                <input
                  type="radio"
                  id="stripe"
                  value="Stripe"
                  name="paymentMethod"
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className="btn btn-green-dark btn-center btn-order"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PaymentMethod;
