import React from "react";

const Product = ({ id, title, category, price, img, desc }) => {
  return (
    <article key={id} className="menu-item">
      <div>
        <img src={img} alt={title} className="photo" />
      </div>
      <div className="item-info">
        <header>
          <h4>{title}</h4>
          <h4 className="price">${price}</h4>
        </header>
        <p>{category}</p>
        <p className="item-text">{desc}</p>
      </div>
    </article>
  );
};
export default Product;
