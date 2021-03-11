import React from "react";

import { info } from "../utils/constants";
import PillowStack from "../srcImages/pillowStack.png";
import FabricStack from "../srcImages/fabric-stack.png";

const AboutInfo = ({ src }) => {
  return (
    <section>
      <div className="section-center">
        <article className="header">
          <h3>Welcome to our page</h3>
        </article>
        <div className="services-center">
          {info.map((info) => {
            const { id, title, text } = info;
            return (
              <article key={id} className="service service-grid">
                <div
                  className="info-images top-radius"
                  style={{
                    backgroundImage: `url(${src})`,
                  }}
                >
                  <h2>{title}</h2>
                </div>
                <div className=" about-info-style bottom-radius box-style-look">
                  <p>{text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
