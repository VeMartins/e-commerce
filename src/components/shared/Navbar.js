import React, { useRef, useEffect, useState } from "react";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiArrowDownSFill } from "react-icons/ri";

import { useGlobalContext } from "../../context/products-context";
import { useFilterContext } from "../../context/filter-context";
import { useCartContext } from "../../context/cart-context";
import { useOrderContext } from "../../context/order-context";
import { useSigninContext } from "../../context/signin-context";
import logo from "../../srcImages/logo.png";

import "./Navbar.css";

const Navbar = () => {
  const { showLinks, closeTopbar, toggleTopbar } = useGlobalContext();
  const { clearFilters } = useFilterContext();
  const { amount, cart } = useCartContext();
  const { userInfo, signOut } = useSigninContext();
  const {
    shippingAddress,
    clearShippingData,
    orderPayReset,
  } = useOrderContext();

  //for user account dropdown
  const [openDropdown, setOpenDropdown] = useState(false);

  const refLinksContainer = useRef(null);
  const linksRef = useRef(null);

  // to assign height of nav-links
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

        <div
          className={`${
            showLinks ? "links-container" : "links-container overflow"
          }`}
          ref={refLinksContainer}
        >
          <ul className="nav-links" ref={linksRef}>
            <li>
              <Link
                to="/"
                onClick={closeTopbar}
                className="nav-link nav-link-border"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={() => {
                  closeTopbar();
                  clearFilters();
                }}
                className="nav-link nav-link-border"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                onClick={closeTopbar}
                className="nav-link nav-link-border"
              >
                Contact
              </Link>
            </li>
            {userInfo && shippingAddress.address ? (
              <li>
                <Link
                  to="/payment"
                  onClick={closeTopbar}
                  className="nav-link nav-link-border"
                >
                  Payment
                </Link>
              </li>
            ) : userInfo && !shippingAddress.address && cart.length > 0 ? (
              <li>
                <Link
                  to="/checkout"
                  onClick={closeTopbar}
                  className="nav-link nav-link-border"
                >
                  Checkout
                </Link>
              </li>
            ) : null}
            <li className="right-nav-link-1 nav-link">
              <Link to="/cart" onClick={closeTopbar}>
                Cart
                <span className="basket">
                  <FaShoppingCart />

                  <span className="cart-count">{amount}</span>
                </span>
              </Link>
            </li>
            {userInfo && (
              <li className="right-nav-link-2 ">
                <div className="dropdown-logout">
                  <Link to="#" onClick={() => setOpenDropdown(!openDropdown)}>
                    {" "}
                    {userInfo.name} <RiArrowDownSFill />
                  </Link>
                  {openDropdown && (
                    <ul className="dropdown-content">
                      <li className="nav-link">
                        <Link
                          to="/"
                          onClick={() => {
                            closeTopbar();
                            setOpenDropdown(false);
                          }}
                        >
                          {" "}
                          Your account
                        </Link>
                      </li>
                      <li className="nav-link">
                        <Link
                          to="#signout"
                          onClick={() => {
                            signOut();
                            setOpenDropdown(false);
                            closeTopbar();
                            clearShippingData();
                            orderPayReset();
                          }}
                        >
                          {" "}
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            )}
            {!userInfo && (
              <li className="nav-link right-nav-link-2">
                <Link to="/signin" onClick={closeTopbar}>
                  {" "}
                  Sign In{" "}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
