import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
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
    <nav>
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
          </ul>

          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
