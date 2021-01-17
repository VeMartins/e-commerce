import React from "react";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-list">
        <li className="social-icons">
          <span className="social-data">Share</span>
          <a
            href="http://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
        </li>
        <li className="social-icons">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagramSquare />
          </a>
        </li>
        <li className="contact">
          <Link to="/help">
            <p>Contact us</p>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
