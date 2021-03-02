import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { RiShoppingBasketFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../../context/context";
import logo from "../../srcImages/logo.png";

import "./Navbar.css";

const Navbar = () => {
  const { totalAmount } = useGlobalContext();
  const [showLinks, setShowLinks] = useState(false);
  const refLinksContainer = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      refLinksContainer.current.style.height = `${linksHeight}px`;
    }
    if (!showLinks) {
      refLinksContainer.current.style.height = `0px`;
    }
  }, [showLinks]);

  return (
    <nav className="nav-container">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Botanica Art Lab logo" className="logo"></img>
          </Link>
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>

        <div className="links-container" ref={refLinksContainer}>
          <ul className="nav-links" ref={linksRef}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/help">Contact Us</Link>
            </li>
            <li className="right-nav-link-1">
              <Link to="/signIn">Sign in</Link>
            </li>
            <li className="right-nav-link-2">
              <Link to="/cart">
                <RiShoppingBasketFill className="basket" />

                <span className="cart-count">{totalAmount}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
