import React, { useContext, useEffect, useReducer, useCallback } from "react";
import axios from "axios";

import reducer from "../reducers/reducer";
import cartReducer from "../reducers/cart-reducer";

const AppContext = React.createContext();
const initialState = {
  data: [],
  loading: false,
  products: [],
  error: false,
  allCategories: [],
  categories: [],
  filteredData: [],
  filterValue: "alph-az",
  sortValue: "all",
};
const cartInitialState = {
  cart: [],
  total: 0,
  amount: 0,
  totalAmount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateCart, dispatchCart] = useReducer(cartReducer, cartInitialState);

  //cart actions
  const addToCart = (product, quantity) => {
    dispatchCart({ type: "ADD_TO_CART", payload: { product, quantity } });
  };
  const updateAmount = (id, quantity) => {
    dispatchCart({ type: "UPDATE_AMOUNT", payload: { id, quantity } });
  };
  const getTotal = useCallback(() => {
    dispatchCart({ type: "GET_TOTAL" });
  }, []);
  const clearCart = () => {
    dispatchCart({ type: "CLEAR_CART" });
  };

  const removeItem = (id) => {
    dispatchCart({ type: "REMOVE", payload: id });
  };
  const increaseItem = (id) => {
    dispatchCart({ type: "INCREASE", payload: id });
  };
  const decreaseItem = (id) => {
    dispatchCart({ type: "DECREASE", payload: id });
  };
  const hasError = (error) => {
    dispatch({
      type: "ERROR",
      payload: error,
    });
  };
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };
  // other state actions
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

  // fetching products
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
        ...stateCart,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        clearError,
        hasError,
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
