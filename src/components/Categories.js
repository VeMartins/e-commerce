import React, { useEffect } from "react";
import { useGlobalContext } from "../context/products-context";
import "./Categories.css";

const Categories = () => {
  const {
    filterItems,
    categories,
    sortTitles,
    filterValue,
  } = useGlobalContext();

  useEffect(() => {
    sortTitles(filterValue);
  }, [sortTitles, filterValue]);

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
            defaultValue="placeholder"
            onChange={(e) => {
              filterItems(e.target.value);
            }}
          >
            <option value="placeholder" disabled>
              Choose here
            </option>
            {categories.map((item, index) => {
              return (
                <option value={item} key={index} className="filterOption">
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="sort-container">
        <label htmlFor="sortTags" className="sortLabel">
          Sort by
        </label>
        <div className="dropdown">
          <select
            className="select"
            name="sortTags"
            id="sortTags"
            defaultValue="placeholder"
            onChange={(e) => {
              e.preventDefault();
              sortTitles(e.target.value);
            }}
          >
            <option value="placeholder" disabled>
              Choose here
            </option>
            <option value="alph-az">Name: A-Z</option>
            <option value="alph-za">Name: Z-A</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Categories;
