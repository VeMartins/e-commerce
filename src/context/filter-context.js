import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter-reducer";
import { useGlobalContext } from "../context/products-context";

const initialState = {
  filteredData: [],
  data: [],
  showMenu: false,
  sortValue: "name-az",
  filters: {
    category: "all products",
    text: "",
    min_price: 0,
    max_price: 0,
    price: 0,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useGlobalContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOAD_PRODUCTS", payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: "SET_FILTERS" });
    dispatch({ type: "SORT_PRODUCTS" });
  }, [products, state.sortValue, state.filters]);

  const updateSort = (e) => {
    //const name = e.target.name; --> name of the select element in this case sort

    const value = e.target.value;

    dispatch({ type: "UPDATE_SORT", payload: value });
  };

  const filterItems = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "price") {
      value = Number(value);
    }

    dispatch({ type: "FILTER_ITEMS", payload: { value, name } });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };
  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    dispatch({ type: "FILTERSELECT", payload: { value, name } });
  };
  const closeMenu = () => {
    dispatch({ type: "MENU_CLOSE" });
  };
  const toggleMenu = () => {
    dispatch({ type: "MENU_TOGGLE" });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateSort,
        filterItems,
        clearFilters,
        updateFilter,
        closeMenu,
        toggleMenu,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
