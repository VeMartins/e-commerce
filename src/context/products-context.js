import React, { useContext, useEffect, useReducer, useCallback } from "react";
import axios from "axios";

import reducer from "../reducers/products-reducer";

const AppContext = React.createContext();
const initialState = {
  showLinks: false,
  loading: false,
  products: [],
  featured_products: [],
  error: false,
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const closeTopbar = () => {
    dispatch({ type: "TOPBAR_CLOSE" });
  };
  const toggleTopbar = () => {
    dispatch({ type: "TOPBAR_TOGGLE" });
  };
  const hasError = (error) => {
    dispatch({
      type: "SINGLE_PRODUCT_ERROR",
      payload: error,
    });
  };
  const clearSingleError = () => {
    dispatch({ type: "CLEAR_SINGLE_PRODUCT_ERROR" });
  };
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const fetchProducts = useCallback(async (url, source) => {
    dispatch({ type: "LOADING" });

    try {
      const response = await axios.get(url, {
        cancelToken: source.token, //cleanup
      });
      const products = response.data;

      dispatch({ type: "DISPLAY_ITEMS", payload: products });
    } catch (err) {
      if (axios.isCancel(err)) {
      } else {
        dispatch({
          type: "ERROR",
          payload: err.message || "Something went wrong please try again.",
        });
      }
    }
  }, []);

  const fetchSingleProduct = useCallback(async (url, id) => {
    dispatch({ type: "SINGLE_PRODUCT_LOADING" });
    try {
      const response = await axios.get(url);
      const products = response.data;

      const singleProduct = await products.find(
        (item) => item.id === parseInt(id)
      );
      dispatch({ type: "DISPLAY_SINGLE_PRODUCT", payload: singleProduct });
    } catch (err) {
      dispatch({
        type: "SINGLE_PRODUCT_ERROR",
        payload:
          err.message ||
          "Not able to display this item at the moment, please try again later",
      });
    }
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source(); //cleanup
    fetchProducts("/api/products", source);
    return () => {
      source.cancel();
    };
  }, [fetchProducts]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchSingleProduct,
        clearSingleError,
        closeTopbar,
        toggleTopbar,
        clearError,
        hasError,
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
