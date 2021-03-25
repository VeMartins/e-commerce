import React, { useState, useRef, useEffect } from "react";

import src2 from "../srcImages/process/328d3d15568e870275639935c9bacfda.jpg";
import src1 from "../srcImages/sof5.jpg";
import src3 from "../srcImages/process/leaf-stamp2.jpg";
import src4 from "../srcImages/process/natural-dyes-500x500.jpg";
import src5 from "../srcImages/process/Leaf-printing-match-1-e1414061943211.jpg";
import src6 from "../srcImages/sofi.jpg";

import "./Slideshow.css";

const imagesArray = [src1, src2, src3, src4, src5, src6];
const delay = 5000;

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imagesArray.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {imagesArray.map((backgroundColor, index) => (
          <img
            className="slide"
            key={index}
            src={backgroundColor}
            alt="process"
          />
        ))}
      </div>

      <div className="slideshowDots">
        {imagesArray.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
