import React from "react";

import CategoriesButtons from "../components/CategoriesButtons";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { useFilterContext } from "../context/filter-context";
import "./Categories.css";

const Categories = ({ display }) => {
  const {
    data,
    clearFilters,
    filterItems,
    filters: { price, max_price, min_price, text },
  } = useFilterContext();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const categories = getUniqueValues(data, "category");

  if (display === "buttons") {
    return <CategoriesButtons categories={categories} />;
  }

  return (
    <div className="filters-page-width">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="search"
          className="search-input"
          value={text}
          onChange={filterItems}
        />
      </form>
      <form onSubmit={handleSubmit} className="filter-form">
        <h5 className="filter-titles">Category</h5>
        <CategoriesButtons categories={categories} styleProductsPage />
      </form>
      <form className="filter-form" onSubmit={handleSubmit}>
        <h5 className="filter-titles">price</h5>
        <p className="price-filter">{formatPrice(price)}</p>
        <input
          type="range"
          name="price"
          onChange={filterItems}
          min={min_price}
          max={max_price}
          value={price}
        />
      </form>
      <button
        type="button"
        onClick={clearFilters}
        className=" btn-green-light btn-clear-filters "
      >
        Clear Filters
      </button>
    </div>
  );
};
export default Categories;
