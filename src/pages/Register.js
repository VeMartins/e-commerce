import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { ErrorModal, Loading, PageHeaderImage } from "../components";
import { useSigninContext } from "../context/signin-context";

import background from "../srcImages/welcome.jpg";

import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const { register, loading, error, userInfo } = useSigninContext();

  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      register(name, email, password);
      setErrorMessage("");
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  return (
    <>
      <PageHeaderImage src={background} title="Register" />
      <section className="section-contact">
        {loading && <Loading />}
        {errorMessage && (
          <ErrorModal
            error={errorMessage}
            className="signin-error"
            style={{ position: "initial" }}
          />
        )}
        {error && (
          <ErrorModal
            error={error}
            className="signin-error"
            style={{ position: "initial" }}
          />
        )}
        <div className="register">
          <div className=" box-style-look register-form">
            <form onSubmit={handleSubmit} className="signin-form ">
              <h2 className="register-title">Create an account</h2>

              <div className="login-input-card">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="form-inputs"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className={`${
                    error ? "form-inputs form-inputs-error" : "form-inputs"
                  } `}
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
                  className={`${
                    errorMessage
                      ? "form-inputs form-inputs-error"
                      : "form-inputs"
                  } `}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your Password"
                  className={`${
                    errorMessage
                      ? "form-inputs form-inputs-error"
                      : "form-inputs"
                  } `}
                  required
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn-green-dark btn-center btn btn-order"
              >
                Register
              </button>
              <div>
                <div className="new-customer">
                  Already have an account? {""}
                  <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Register;
