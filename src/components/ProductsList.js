import React from "react";

import { useGlobalContext } from "../context/context";

import { Loading, Product, ErrorModal, Categories } from "./";

import "./ProductsList.css";

const ProductsList = () => {
  const { clearError, products, loading, error } = useGlobalContext();

  return (
    <React.Fragment>
      {loading && <Loading />}
      {error && (
        <ErrorModal
          error={error}
          onClear={clearError}
          header="Failed to load products, please try again later."
          linkText={"Okay"}
        />
      )}

      {!error && !loading && (
        <article className="section">
          <header>
            <div>
              <Categories />
            </div>
          </header>
          <div className="page-width">
            <ul className="content-container grid">
              {products.map((item) => {
                return <Product key={item.id} {...item} product={item} />;
              })}
            </ul>
          </div>
        </article>
      )}
    </React.Fragment>
  );
};
export default ProductsList;
