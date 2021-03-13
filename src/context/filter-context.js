import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter-reducer";
import { useGlobalContext } from "../context/products-context";

const initialState = {
  filteredData: [],
  data: [],
  sortValue: "alph-az",
  filterValue: "all",
  allCategories: [],
  categories: [],
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useGlobalContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOAD_PRODUCTS", payload: products });
  }, [products]);
  useEffect(() => {
    dispatch({ type: "SORT_PRODUCTS" });
  }, [products, state.sortValue, state.filterValue]);

  const updateSort = (e) => {
    //const name = e.target.name; --> name of the select element in this case sort

    const value = e.target.value;
    console.log(value);
    dispatch({ type: "UPDATE_SORT", payload: value });
  };

  const filterItems = (e) => {
    const value = e.target.value;
    dispatch({ type: "FILTER_ITEMS", payload: value });
  };

  useEffect(() => {
    dispatch({ type: "INITIAL_CATEGORIES" });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state, updateSort, filterItems }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
