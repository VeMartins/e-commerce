import React from "react";

import { useFilterContext } from "../context/filter-context";
import "./Categories.css";

const CategoriesSelect = ({ categories }) => {
  const {
    filters: { category },
    updateFilter,
  } = useFilterContext();
  return (
    <div>
      <label htmlFor="category"></label>
      <div className="dropdown">
        <select
          className="select select-color"
          name="category"
          id="category"
          value={category}
          onChange={updateFilter}
        >
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
  );
};

export default CategoriesSelect;
