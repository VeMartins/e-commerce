import React from "react";

import { useFilterContext } from "../context/filter-context";
import "./Categories.css";

const Categories = () => {
  const {
    sortValue,
    updateSort,
    categories,
    filterItems,
    filterValue,
  } = useFilterContext();

  return (
    <div className="categories">
      <div className="filter-container">
        <label htmlFor="filterTags" className="filterLabel">
          Filter by
        </label>
        <div className="dropdown">
          <select
            className="select"
            name="filterTags"
            id="filterTags"
            value={filterValue}
            onChange={filterItems}
          >
            {categories.map((item, index) => {
              return (
                <option
                  value={item.category}
                  key={index}
                  className="filterOption"
                >
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <form className="sort-container">
        <label htmlFor="sort" className="sortLabel">
          Sort by
        </label>
        <div className="dropdown">
          <select
            className="select"
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
    </div>
  );
};
export default Categories;
