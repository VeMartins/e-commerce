import React, { useState } from "react";
import envelope from "../srcImages/envelope.jpg";

const ContactUs = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="section-contact">
      <main>
        <h1 className="titles">Contact Us</h1>
        <div>
          <div className="contact-container">
            <img src={envelope} alt="envelope" className="box-style-look" />
            <div className="box-style-look w-60">
              <div className="m-around">
                <p className="">
                  If you have any questions you can send an email to:
                </p>
                <p className="">
                  <b>fake_email@gmail.com </b>{" "}
                </p>
              </div>
              <p className="top-border-parag"> Or for a Short Message: </p>
              <form onSubmit={handleSubmit} className="contact-form m-around">
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
                    className="contact-inputs m-top-1"
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
                    className="contact-inputs m-top-1 "
                    required
                  />
                </div>
                <button type="submit" className="btn-details btn m-top-2">
                  {status}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ContactUs;
