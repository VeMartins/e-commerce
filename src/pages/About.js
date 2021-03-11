import React from "react";

import { PageHeader } from "../components";
import PillowStack from "../srcImages/pillowStack.png";
import FabricStack from "../srcImages/fabric-stack.png";
import AboutInfo from "../components/AboutInfo";
import Connect from "../components/Connect";

import "./About.css";
const About = () => {
  return (
    <main className="main-about">
      <PageHeader title="About" />
      <AboutInfo src={PillowStack} />
      <Connect />
    </main>
  );
};

export default About;
