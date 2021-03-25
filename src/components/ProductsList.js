import React from "react";

import { useGlobalContext } from "../context/products-context";
import { useFilterContext } from "../context/filter-context";

import { Loading, Product, ErrorModal, Categories } from "./";
import SortBy from "./SortBy";

import "./ProductsList.css";

const ProductsList = () => {
  const { clearError, loading, error } = useGlobalContext();
  const { filteredData: products } = useFilterContext();

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
        <article className="section products-grid">
          <section className="filters-header">
            <hr className="filters-hr" />
            <Categories />
            <hr className="filters-hr" />
          </section>
          <div className="page-width">
            <SortBy />
            <section>
              <ul className="content-container ">
                {products.map((item) => {
                  return <Product key={item.id} {...item} product={item} />;
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
