import React, { useContext, useEffect, useReducer, useCallback } from "react";
import axios from "axios";

import reducer from "./reducer";

const AppContext = React.createContext();
const initialState = {
  data: [],
  loading: false,
  products: [],
  error: false,
  cart: [],
  total: 0,
  amount: 0,
  totalAmount: 0,
  allCategories: [],
  categories: [],
  filteredData: [],
  filterValue: "alph-az",
  sortValue: "all",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product, quantity) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
  };
  const updateAmount = (id, quantity) => {
    dispatch({ type: "UPDATE_AMOUNT", payload: { id, quantity } });
  };
  const getTotal = useCallback(() => {
    dispatch({ type: "GET_TOTAL" });
  }, []);
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const increaseItem = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  const decreaseItem = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const sortTitles = useCallback((sortType) => {
    dispatch({ type: "SORT_ITEMS", payload: sortType });
  }, []);

  const filterItems = useCallback(
    (category) => {
      dispatch({ type: "FILTER_ITEMS", payload: category });
      sortTitles(state.filterValue);
    },
    [sortTitles, state.filterValue]
  );
  useEffect(() => {
    const source = axios.CancelToken.source(); //cleanup
    const fetchProducts = async () => {
      dispatch({ type: "LOADING" });

      try {
        const { data } = await axios.get("/api/products", {
          cancelToken: source.token, //cleanup
        });

        dispatch({ type: "DISPLAY_ITEMS", payload: data });
        dispatch({ type: "INITIAL_CATEGORIES" });
      } catch (err) {
        if (axios.isCancel(err)) {
        } else {
          dispatch({
            type: "ERROR",
            payload: err.message || "Something went wrong please try again.",
          });
        }
      }
    };
    fetchProducts();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    getTotal();
  }, [state.cart, getTotal]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        clearError,
        filterItems,
        sortTitles,
        addToCart,
        dispatch,
        updateAmount,
        getTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
