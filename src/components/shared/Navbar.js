import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaShoppingCart, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

import {
  useProductContext,
  useFilterContext,
  useCartContext,
  useOrderContext,
  useSigninContext,
} from "../../context";
import logo from "../../srcImages/logo.png";

import "./Navbar.css";

const Navbar = () => {
  const { showLinks, closeTopbar, toggleTopbar } = useProductContext();
  const { clearFilters } = useFilterContext();
  const { amount } = useCartContext();
  const { userInfo, signOut, resetUserProfile } = useSigninContext();
  const { clearShippingData, orderPayReset } = useOrderContext();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const dropRef = useRef(null);
  const adminRef = useRef(null);

  const closeAllModals = () => {
    closeTopbar();
    setOpenDropdown(false);
    setOpenAdmin(false);
  };

  const signOutHandler = () => {
    closeAllModals();
    signOut();
    clearShippingData();
    orderPayReset();
    resetUserProfile();
  };

  const handleClickOutside = (e) => {
    if (dropRef) {
      if (
        (dropRef.current && dropRef.current.contains(e.target)) ||
        window.innerWidth <= 800
      ) {
        // inside click
        return;
      }
      // outside click
      setOpenDropdown(false);
    }
    if (adminRef) {
      if (
        (adminRef.current && adminRef.current.contains(e.target)) ||
        window.innerWidth <= 800
      ) {
        return;
      }

      setOpenAdmin(false);
    }
  };
  useEffect(() => {
    if (openDropdown || openAdmin) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown, openAdmin]);

  return (
    <nav className="nav-container">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" onClick={closeTopbar}>
            <img src={logo} alt="Botanica Art Lab logo" className="logo"></img>
          </Link>
          <button className="nav-toggle" onClick={toggleTopbar}>
            {showLinks ? <FaWindowClose /> : <FaBars />}
          </button>
        </div>

        <div
          className={`${
            showLinks ? "links-container show" : "links-container overflow"
          }`}
        >
          <ul className="nav-links">
            <li className="nav-link">
              <Link to="/" onClick={closeTopbar} className=" nav-link-border">
                Home
              </Link>
            </li>
            <li className="nav-link">
              <Link
                to="/products"
                onClick={() => {
                  closeTopbar();
                  clearFilters();
                }}
                className=" nav-link-border"
              >
                Products
              </Link>
            </li>
            <li className="nav-link">
              <Link
                to="/help"
                onClick={closeTopbar}
                className=" nav-link-border"
              >
                Contact
              </Link>
            </li>
            {userInfo && userInfo.isAdmin && (
              <li className="nav-link-dropdown">
                <div className="dropdown-logout admin">
                  <Link to="#" onClick={() => setOpenAdmin(!openAdmin)}>
                    Admin
                    {openAdmin ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                  </Link>

                  {openAdmin && (
                    <div className="hidden-div" ref={adminRef}>
                      <Link to="/productlist" onClick={closeAllModals}>
                        {" "}
                        Products list
                      </Link>
                      <Link to="/orderlist" onClick={closeAllModals}>
                        {" "}
                        Orders
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            )}
            <li className="nav-link-cart nav-link">
              <Link to="/cart" onClick={closeTopbar}>
                Cart
                <span className="basket">
                  <FaShoppingCart />

                  <span className="cart-count">{amount}</span>
                </span>
              </Link>
            </li>
            {!userInfo && (
              <li className="nav-link nav-link-dropdown">
                <Link to="/signin" onClick={closeTopbar}>
                  {" "}
                  Sign In{" "}
                </Link>
              </li>
            )}
            {userInfo && (
              <li className="nav-link-dropdown ">
                <div className="dropdown-logout">
                  <Link to="#" onClick={() => setOpenDropdown(!openDropdown)}>
                    {" "}
                    {userInfo.name}
                    {openDropdown ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                  </Link>
                  {openDropdown && (
                    <div className="hidden-div " ref={dropRef}>
                      <Link to="/userprofile" onClick={closeAllModals}>
                        {" "}
                        My Account
                      </Link>

                      <Link to="/orderhistory" onClick={closeAllModals}>
                        {" "}
                        Order History
                      </Link>

                      <Link to="#signout" onClick={signOutHandler}>
                        {" "}
                        Sign out
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
