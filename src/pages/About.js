import React from "react";
import "./About.css";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import PillowStack from "../srcImages/pillowStack.png";
import FabricStack from "../srcImages/fabric-stack.png";
const About = () => {
  return (
    <section className="section-about">
      <div className="about-container">
        <header className="about-title titles">
          <h1>Welcome</h1>
          <p>
            Botânica ArteLab is an environmentally friendly botanic and textile
            art company based in Azores-Portugal.
          </p>
        </header>
        <div className="photo-container box-style">
          <div className="element-center photo-div">
            <img
              src="./images/sof.png"
              alt="photoOfTheArtist"
              className="about-photos element-center"
            />
          </div>
        </div>
        <div className="about-info">
          <div className="about-us about-sections">
            <div className="about-parag left-box box-style">
              <p>
                This project was born in 2017 from a strong desire and impulse
                to eternalize the ephemeral beauty of nature and register the
                beauty of life and its cycles in different ways. We want to
                preserve the nature that surrounds us, alive and beautiful as it
                is. Therefore, the need to create products that offer ecological
                and sustainable solutions for our daily lives and for the planet
                emerged.
              </p>
            </div>
            <div
              className="about-text radius-top right-box"
              style={{
                backgroundImage: `url(${PillowStack})`,
              }}
            >
              <h2 className="element-center">About Us</h2>
            </div>
          </div>
          <div className="our-process about-sections">
            <div className="process-parag left-box box-style ">
              <p>
                We work with nature through manual pressing and natural dyes
                using traditional techniques. In an attempt to increase the
                useful life of a material, we also resort to the recycling of
                textiles and other materials/waste, transforming them into a new
                product.
              </p>
            </div>
            <div
              className="process-text radius-top right-box"
              style={{
                backgroundImage: `url(${FabricStack})`,
              }}
            >
              <h2 className="element-center">Our Process</h2>
            </div>
          </div>
          <div className="connect  about-sections">
            <div className="connect-parag left-box box-style">
              <p>
                Info, orders and partnerships to <b> fake_email@gmail.com </b>
                <br /> Based in Azores-Portugal
              </p>
              <ul className="footer-list">
                <li className="social-icons">
                  <span className="social-data">Connect</span>
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
            </div>
            <div className="photo-div box-style right-box">
              <img
                src="./images/sof6.jpg"
                alt="artist and island-view"
                className="about-photos element-center connect-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
