import React from "react";

import ProductFeatured from "./ProductFeatured";
import { Loading, ErrorModal } from "../components";
import { useProductContext } from "../context/products-context";

import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const {
    featured_products: products,
    loading,
    error,
    clearError,
  } = useProductContext();
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="featured-section">
      <div className="featured-title">
        <h2>Featured Products</h2>
        <div className="underline"></div>
      </div>
      <div className=" section-width featured">
        {error && (
          <ErrorModal
            error={error}
            onClear={clearError}
            footer
            header="Failed to load featured products."
            linkText={"Okay"}
            className="featured-error"
          />
        )}
        {products.map((product) => {
          return <ProductFeatured key={product._id} {...product} />;
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
