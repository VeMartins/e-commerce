import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useOrderContext } from "../context/order-context";

import CheckoutSteps from "../components/CheckoutSteps";

import "./Checkout.css";

const Checkout = () => {
  const { saveShippingAddress, shippingAddress } = useOrderContext();

  const history = useHistory();

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveShippingAddress({ fullName, address, city, postalCode, country });
    history.push("/payment");
  };

  return (
    <section className="section-contact section-checkout">
      <div className="checkout-steps-wrapper">
        <CheckoutSteps step1 step2 />
      </div>
      <div className="  signin order-margin">
        <form className="signin-form" onSubmit={handleSubmit}>
          <div>
            <h2 className="checkout-title">Shipping Address</h2>
          </div>
          <div className="login-input-card">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              className="signin-inputs form-inputs"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="login-input-card">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter your shipping address"
              className="signin-inputs form-inputs"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="login-input-card">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              className="signin-inputs form-inputs"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="login-input-card">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter Postal Code"
              className="signin-inputs form-inputs"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="login-input-card">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              className="signin-inputs form-inputs"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div>
            <label />
            <button
              className="btn-green-dark btn-center btn btn-order"
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

export default Checkout;
