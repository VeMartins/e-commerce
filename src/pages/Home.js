import React from "react";

import { PageHeaderImage } from "../components";
import AboutUs from "../components/AboutUs";
import FeaturedProducts from "../components/FeaturedProducts";
import { Categories } from "../components";
import background from "../srcImages/toteBag12.jpg";

import "./Home.css";

const Home = () => {
  return (
    <main className="main-about">
      <PageHeaderImage title="Home" src={background} />
      <Categories display="buttons" />
      <FeaturedProducts />
      <AboutUs />
    </main>
  );
};

export default Home;
