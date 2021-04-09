import React from "react";

import ProductFeatured from "./ProductFeatured";
import { Loading, ErrorModal } from "../components";
import { useGlobalContext } from "../context/products-context";

import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const {
    featured_products: products,
    loading,
    error,
    clearError,
  } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  /*if (error) {
    return (
      <ErrorModal
        error={error}
        onClear={clearError}
        header="Failed to load featured products."
        linkText={"Okay"}
        
      />
    );
  }*/
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
