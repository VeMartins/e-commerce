import React, { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "./ImageThumbnail.css";

const ImageThumbnail = ({ thumbnail2, img, title, id }) => {
  const [srcImg, setSrcImg] = useState("");

  const preview = (imgSrc) => {
    setSrcImg(imgSrc);
  };

  useEffect(() => {
    setSrcImg(img);
  }, [id, img]);
  return (
    <div className="pic-container">
      <div className="pic-middle-container">
        <div>
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={100}
            defaultPositionY={200}
          >
            {({ zoomIn, zoomOut, ...rest }) => (
              <>
                <button className="btn-green-dark zoom-btn" onClick={zoomIn}>
                  +
                </button>
                <button className="btn-green-dark zoom-btn" onClick={zoomOut}>
                  -
                </button>

                <TransformComponent>
                  <img src={srcImg} alt={title} className="featured-photo" />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      </div>
      <div className="see-more-photos">
        <ul className="thumbnail-list">
          <li className="thumbnail">
            <img
              src={img}
              alt={title}
              onMouseOver={(e) => preview(e.target.src)}
            />
          </li>
          <li className="thumbnail">
            <img
              src={thumbnail2}
              alt={`thumbnail2 ${title}`}
              onMouseOver={(e) => preview(e.target.src)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImageThumbnail;
