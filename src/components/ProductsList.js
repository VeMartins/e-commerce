import React from "react";

import { useGlobalContext } from "../context";
import Loading from "./Loading";
import Product from "./Product";
import Categories from "./Categories";

import "./ProductsList.css";

const ProductsList = () => {
  const { products, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (products.length < 1) {
    return <h2>No Products Available</h2>;
  }
  return (
    <section className="section">
      <header>
        <div className="titles">
          <h2> Products</h2>
        </div>
        <div>
          <Categories />
        </div>
      </header>
      <div className="page-width">
        <ul className="content-container grid">
          {products.map((item) => {
            return <Product key={item.id} {...item} />;
          })}
        </ul>
      </div>
    </section>
  );
};
export default ProductsList;
