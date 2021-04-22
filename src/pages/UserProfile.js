import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSigninContext } from "../context";
import { ErrorModal, Loading, PageHeaderImage } from "../components";
import background from "../srcImages/welcome.jpg";

const UserProfile = () => {
  const {
    userInfo,
    userDetails,
    loading: loadingUpdate,
    error: errorUpdate,
    getUserDetails,
    updateUserProfile,
    success: successUpdate,
    resetUserProfile,
  } = useSigninContext();

  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  useEffect(() => {
    if (!userDetails) {
      resetUserProfile();
      getUserDetails(userInfo._id);
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [userInfo, getUserDetails, userDetails, resetUserProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      updateUserProfile({ userId: userDetails._id, name, email, password });
      setErrorMessage("");
    }
  };
  return (
    <>
      <PageHeaderImage
        src={background}
        title="Profile"
        link={<Link to="/">Home / </Link>}
      />
      <section className="section-contact">
        {loadingUpdate && <Loading />}
        {errorMessage && (
          <ErrorModal
            error={errorMessage}
            className="signin-error"
            style={{ position: "initial" }}
          />
        )}
        {errorUpdate && (
          <ErrorModal
            error={errorUpdate}
            className="signin-error"
            style={{ position: "initial" }}
          />
        )}
        {successUpdate && (
          <ErrorModal
            header="Profile Updated"
            className="success-message"
            style={{ position: "initial" }}
          />
        )}
        <div className="register">
          <div className=" box-style-look register-form">
            <form onSubmit={handleSubmit} className="signin-form ">
              <h2 className="register-title">My Account Details</h2>

              <div className="login-input-card">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="form-inputs"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="login-input-card">
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  defaultValue={email}
                  className={`${
                    errorUpdate
                      ? "form-inputs form-inputs-error"
                      : "form-inputs"
                  } `}
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
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn-green-dark btn-center btn btn-order"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default UserProfile;
