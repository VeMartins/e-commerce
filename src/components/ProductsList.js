import React from "react";

import { useGlobalContext } from "../context/context";
import Loading from "./shared/Loading";
import Product from "./Product";
import ErrorModal from "./shared/ErrorModal";
import Categories from "./Categories";

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
        />
      )}

      {!error && !loading && (
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
                return <Product key={item.id} {...item} product={item} />;
              })}
            </ul>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};
export default ProductsList;
