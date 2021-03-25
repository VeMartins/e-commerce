import React from "react";

import Slideshow from "./Slideshow";

import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="aboutUs-section">
      <article className=" about-grid aboutUs-grid">
        <Slideshow className="slideshow-container" />
        <div className="about-btm-margin our-story ">
          <h1 className="about-btm-margin about-titles">Our Story</h1>

          <p className=" about-padding">
            Botanica ArteLab is an environmentally friendly botanic and textile
            art company based in Azores-Portugal that was created in 2017 . This
            company was born from a strong desire and impulse to eternalize the
            ephemeral beauty of nature and register the beauty of life and its
            cycles in different ways. It is important to preserve the nature
            that surrounds us, alive and beautiful as it is. Therefore, we
            create products that offer ecological and sustainable solutions for
            our daily lives and for the planet.
          </p>
          <div className="our-process">
            <h3 className="our-process-title ">Our Process</h3>

            <p className=" about-padding">
              We work with nature through manual pressing and natural dyes using
              traditional techniques in an attempt to increase the useful life
              of a material. We also resort to the recycling of textiles and
              other materials/waste, transforming them into a new product.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AboutUs;
