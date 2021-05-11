import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

import envelope from "../srcImages/envelope.jpg";
import background from "../srcImages/post.jpg";
import { ErrorModal, Loading, PageHeaderImage } from "../components";
import { useSigninContext } from "../context";
import "./ContactUs.css";

const ContactUs = () => {
  const {
    success: success_contact,
    loading,
    error,
    sendEmail,
    resetUserProfile,
    userInfo,
  } = useSigninContext();
  const history = useHistory();

  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo) {
      setErrorMessage("You need to sign in to send a message");
    }
    if (userInfo) {
      sendEmail(subject, email, text);
    }
  };
  useEffect(() => {
    resetUserProfile(); // success: false
    setSubject("");
    setEmail("");
    setText("");
    setErrorMessage("");
  }, [success_contact, resetUserProfile]);
  return (
    <main>
      <PageHeaderImage
        title="Contact Us"
        src={background}
        link={<Link to="/">Home / </Link>}
      />
      {loading && <Loading />}
      {error && (
        <ErrorModal
          error={error}
          footer
          onClear={resetUserProfile}
          linkText={"Okay"}
          className="signin-error"
          style={{ position: "initial" }}
        />
      )}
      {errorMessage && (
        <ErrorModal
          error={errorMessage}
          footer
          onClear={() => {
            resetUserProfile();
            history.push("/signin?redirect=help");
          }}
          linkText={"Okay"}
          className="signin-error"
          style={{ position: "initial" }}
        />
      )}
      <section className="section-contact">
        <div className="contact-container">
          <div className="contact-img-container">
            <img src={envelope} alt="envelope" className="box-style-look" />
            <span className="social-icons contact-icons">
              <span className="">
                <p>Follow Us :</p>
              </span>
              <a
                href="http://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagramSquare />
              </a>
            </span>
          </div>
          <div className="box-style-look contact-details">
            <div>
              <h2 className="about-btm-margin">Contact Us</h2>
              <p className="contact-btm-margin">
                {" "}
                <b>We are happy to answer any questions</b>
              </p>
            </div>

            <div className="about-btm-margin">
              send us an email to: <br />
              <p className="contact-email">fake_email@gmail.com </p>
              <p>For any questions or information about partnerships</p>
            </div>

            <p className="top-border-parag"> Or for a Short Message: </p>
            <form onSubmit={handleSubmit} className="contact-form ">
              <div>
                <label htmlFor="subject"></label>
                <input
                  type="text"
                  id="subject"
                  maxLength="20"
                  placeholder="Subject"
                  className="contact-inputs form-inputs"
                  value={subject}
                  required
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email"></label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="contact-inputs form-inputs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="message"></label>
                <textarea
                  id="message"
                  maxLength="200"
                  rows="5"
                  placeholder="Short Message"
                  className="contact-inputs  form-inputs"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-green-dark btn  btn-center">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
