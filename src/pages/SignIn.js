import React, { useState } from "react";
import "./ContactUs.css";
import "./SignIn.css";

const SignIn = () => {
  const [status] = useState("Login");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="section-contact">
      <h1 className="titles">Login</h1>
      <div className="box-style-look signin">
        <form className="signin-form " onSubmit={handleSubmit}>
          <div className="login-input-card">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="contact-inputs"
              required
            />
          </div>
          <div className="login-input-card">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="contact-inputs"
              required
            />
          </div>
          <div className="login-input-card">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="contact-inputs"
              required
            />
          </div>
          <button type="submit" className="btn-green-dark btn-center btn ">
            {status}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
