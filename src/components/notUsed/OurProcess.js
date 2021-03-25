import React from "react";

import src1 from "../srcImages/process/328d3d15568e870275639935c9bacfda.jpg";
import src3 from "../srcImages/process/leaf-stamp2.jpg";
import src5 from "../srcImages/process/natural-dyes-500x500.jpg";
import src4 from "../srcImages/process/Leaf-printing-match-1-e1414061943211.jpg";

import "./OurProcess.css";

const OurProcess = () => {
  return (
    <div className="images-bundle">
      <div className="process-images">
        <div className="column">
          <div className="column-padding">
            <img src={src1} alt="product" className="process-img" />
          </div>
        </div>
        <div className="column">
          <div className="column-padding">
            <img src={src5} alt="product" className="process-img" />
          </div>
        </div>
        <div className="column">
          <div className="column-padding">
            <img src={src3} alt="product" className="process-img" />
          </div>
        </div>
        <div className="column">
          <div className="column-padding">
            <img src={src4} alt="product" className="process-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
