import React, { useState, useEffect, useCallback } from "react";
import { useGlobalContext } from "../context";
import "./Categories.css";
import data from "../data";

const allCategories = ["all", ...new Set(data.map((item) => item.category))];
const Categories = () => {
  const { setProducts, products } = useGlobalContext();

  const [categories] = useState(allCategories);
  const [filteredData, setFilteredData] = useState(products);
  const [filterValue, setFilterValue] = useState("alph-az");
  const [sortValue] = useState("all");

  //filter by category
  const filterItems = useCallback(
    (category) => {
      if (category === "all") {
        const allItems = [...data];
        setProducts(allItems);
        setFilteredData(allItems);

        return;
      }
      const newItems = data.filter((item) => item.category === category);
      setProducts(newItems);
      setFilteredData(newItems);
    },
    [setProducts]
  );
  // sort by type --> name(alphabetical, reverse alphabetical), price(low, high)
  const sortTitles = useCallback(
    (sortType) => {
      function compareValues(sortBy, order = "asc") {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(sortBy) || !b.hasOwnProperty(sortBy)) {
            return 0;
          }

          const itemA =
            typeof a[sortBy] === "string" ? a[sortBy].toUpperCase() : a[sortBy];
          const itemB =
            typeof b[sortBy] === "string" ? b[sortBy].toUpperCase() : b[sortBy];

          let comparison = 0;
          if (itemA > itemB) {
            comparison = 1;
          } else if (itemA < itemB) {
            comparison = -1;
          }
          return order === "desc" ? comparison * -1 : comparison;
        };
      }

      const newArr = [...filteredData];
      switch (sortType) {
        case "alph-az":
          setProducts(newArr.sort(compareValues("title")));
          setFilterValue("alph-az");
          break;
        case "alph-za":
          setProducts(newArr.sort(compareValues("title", "desc")));
          setFilterValue("alph-za");
          break;

        case "price-low":
          setProducts(newArr.sort(compareValues("price")));
          setFilterValue("price-low");
          break;
        case "price-high":
          setProducts(newArr.sort(compareValues("price", "desc")));
          setFilterValue("price-high");
          break;
        default:
          setProducts(newArr.sort(compareValues("title")));
          setFilterValue("alph-az");
      }
    },
    [filteredData, setProducts]
  );

  // to sort all items in alphabethic order on each render
  useEffect(() => {
    sortTitles(filterValue);
  }, [sortTitles, filterValue]);

  // to sort all items by category on each render ('all')
  useEffect(() => {
    filterItems(sortValue);
  }, [filterItems, sortValue]);

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
