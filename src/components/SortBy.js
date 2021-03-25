import React from "react";

import { useFilterContext } from "../context/filter-context";
import "./Categories.css";

const SortBy = () => {
  const { sortValue, updateSort } = useFilterContext();

  return (
    <form className="sort-container">
      <label htmlFor="sort" className="sort-label">
        Sort by
      </label>
      <div className="dropdown">
        <select
          className="select "
          name="sort"
          id="sort"
          value={sortValue}
          onChange={updateSort}
        >
          <option value="name-az">Name: A-Z</option>
          <option value="name-za">Name: Z-A</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
      </div>
    </form>
  );
};

export default SortBy;
