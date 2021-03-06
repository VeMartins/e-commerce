import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { ErrorModal, Loading, PageHeaderImage } from "../components";
import { useSigninContext } from "../context/signin-context";
import background from "../srcImages/welcome.jpg";
import "./ContactUs.css";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loading, error, userInfo } = useSigninContext();

  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  useEffect(() => {
    /*const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);*/

    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  return (
    <>
      <PageHeaderImage src={background} title="Sign in" />
      <section className="section-contact">
        {loading && <Loading />}
        {error && (
          <ErrorModal
            error={error}
            className="signin-error"
            style={{ position: "initial" }}
          />
        )}
        <div className=" signin">
          <form className="signin-form box-style-look" onSubmit={handleSubmit}>
            <h2 className="register-title">Sign in</h2>
            <div className="login-input-card">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="signin-inputs form-inputs"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-input-card">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="signin-inputs form-inputs"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn-green-dark btn-center btn btn-order"
            >
              Login
            </button>
            <div>
              <div className="new-customer">
                New Customer? {""}
                <Link to={`/register?redirect=${redirect}`}>
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignIn;
