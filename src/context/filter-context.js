import React, { useEffect, useContext, useReducer } from "react";
//import reducer from "../reducers/filter-reducer";
import {
  //LOAD_PRODUCTS,
  //SET_GRIDVIEW,
  //SET_LISTVIEW,
  //UPDATE_SORT,
  SORT_ITEMS,
  //UPDATE_FILTERS,
  FILTER_ITEMS,
  //CLEAR_FILTERS,
} from "../actions";
//import { useProductsContext } from "./products_context";

const initialState = {};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  return (
    <FilterContext.Provider value="filter context">
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
