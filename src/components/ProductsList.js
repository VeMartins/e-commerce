import React from "react";
import { useGlobalContext } from "../context";
import Loading from "./Loading";
import Product from "./Product";

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
      <h2> Products</h2>
      <div className="products-list">
        {products.map((item) => {
          return <Product key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};
export default ProductsList;
