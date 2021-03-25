import React, { useState } from "react";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";

import envelope from "../srcImages/envelope.jpg";
import background from "../srcImages/post.jpg";
import { PageHeaderImage } from "../components";
import "./ContactUs.css";

const ContactUs = () => {
  const [status] = useState("Submit");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <PageHeaderImage title="Contact Us" src={background} />
      <main>
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
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    id="name"
                    maxLength="20"
                    placeholder="Name"
                    className="contact-inputs"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="contact-inputs "
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
                    className="contact-inputs  "
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-green-dark btn  btn-center"
                >
                  {status}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactUs;
