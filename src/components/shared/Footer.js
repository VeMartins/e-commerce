import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-ul">
        <li className="copy-rights footer-li">
          <p>
            &copy;{new Date().getFullYear()}
            <span> Botânica ArteLab </span>
          </p>{" "}
          <p> All rights reserved</p>
        </li>
        <li className=" footer-li">
          <ul>
            <li className="social-icons">
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
          </ul>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
