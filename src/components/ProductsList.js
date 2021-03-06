import React from "react";

import { useProductContext } from "../context/products-context";
import { useFilterContext } from "../context/filter-context";

import { Loading, Product, ErrorModal, Categories } from "./";
import SortBy from "./SortBy";

import "./ProductsList.css";

const ProductsList = () => {
  const { clearError, loading, error } = useProductContext();
  const { filteredData: products } = useFilterContext();

  return (
    <React.Fragment>
      {loading && <Loading />}
      {error && (
        <ErrorModal
          error={error}
          onClear={clearError}
          footer
          header="Failed to load products, please try again later."
          linkText={"Okay"}
        />
      )}

      {!error && !loading && (
        <article className="section products-grid">
          <section className="filters-header">
            <hr className="filters-hr" />
            <Categories />
            <hr className="filters-hr" />
          </section>
          <div className="page-width">
            <SortBy />
            <section>
              {products.length < 1 && (
                <h4 style={{ textTransform: "none" }}>
                  Sorry, no products matched your search...
                </h4>
              )}
              <ul className="content-container ">
                {products.map((item) => {
                  return <Product key={item._id} {...item} product={item} />;
                })}
              </ul>
            </section>
          </div>
        </article>
      )}
    </React.Fragment>
  );
};
export default ProductsList;
