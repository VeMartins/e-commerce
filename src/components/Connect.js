import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
//import "../pages/About.css";

const Connect = () => {
  return (
    <div className="connect">
      <div className=" connect-grid">
        <div className=" box-style-look top-radius connect-container">
          <p>
            For info on orders and partnerships send an email to: <br />{" "}
            <b>fake_email@gmail.com</b> <br /> or send a message through our{" "}
            <br />{" "}
            <Link to="/help" className="contact-link">
              Contact page
            </Link>
            .
            <br /> Based in Azores-Portugal
          </p>
          <div className="social-icons">
            <span className=""></span>
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
          </div>
        </div>
        <div
          className="connect-image"
          style={{
            backgroundImage: ' url("./images/sof6.jpg")',
          }}
        >
          {/* <img
            src="./images/sof6.jpg"
            alt="artist and island-view"
            className="bottom-radius connect-image"
          />*/}
        </div>
      </div>
    </div>
  );
};

export default Connect;
