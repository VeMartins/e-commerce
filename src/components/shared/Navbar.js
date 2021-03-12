import React, { useRef, useEffect } from "react";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../../context/products-context";
import { useCartContext } from "../../context/cart-context";
import logo from "../../srcImages/logo.png";

import "./Navbar.css";

const Navbar = () => {
  const { showLinks, closeTopbar, toggleTopbar } = useGlobalContext();
  const { amount } = useCartContext();

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
          <Link to="/" onClick={closeTopbar}>
            <img src={logo} alt="Botanica Art Lab logo" className="logo"></img>
          </Link>
          <button className="nav-toggle" onClick={toggleTopbar}>
            <FaBars />
          </button>
        </div>

        <div className="links-container" ref={refLinksContainer}>
          <ul className="nav-links" ref={linksRef}>
            <li>
              <Link to="/" onClick={closeTopbar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeTopbar}>
                About
              </Link>
            </li>
            <li>
              <Link to="/help" onClick={closeTopbar}>
                Contact
              </Link>
            </li>
            <li className="right-nav-link-1">
              <Link to="/signIn" onClick={closeTopbar}>
                Login
              </Link>
            </li>
            <li className="right-nav-link-2">
              <Link to="/cart" onClick={closeTopbar}>
                Cart
                <span className="basket">
                  <FaShoppingCart />

                  <span className="cart-count">{amount}</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
