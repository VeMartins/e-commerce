import React, { useContext, useEffect, useReducer, useCallback } from "react";
import axios from "axios";

import reducer from "../reducers/products-reducer";

const ProductContext = React.createContext();
const initialState = {
  showLinks: false,
  loading: false,
  products: [],
  featured_products: [],
  error: false,
  // existing single product
  single_product_loading: false,
  single_product_error: false,
  single_product_stock_error: false,
  single_product: {},
  // creating new product
  new_product: {},
  new_product_error: false,
  success_create_product: false,
  //updating single product
  success_product_update: false,
  updated_product: {},
  error_product_update: false,
  loading_product_update: false,
  //deleting single product
  delete_error: false,
  success_delete_product: false,
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const closeTopbar = () => {
    dispatch({ type: "TOPBAR_CLOSE" });
  };
  const toggleTopbar = () => {
    dispatch({ type: "TOPBAR_TOGGLE" });
  };
  const hasError = (error) => {
    dispatch({
      type: "SINGLE_PRODUCT_STOCK_ERROR",
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

  const fetchSingleProduct = useCallback(async (url) => {
    dispatch({ type: "SINGLE_PRODUCT_LOADING" });
    try {
      const response = await axios.get(url);
      const product = response.data;

      dispatch({ type: "DISPLAY_SINGLE_PRODUCT", payload: product });
    } catch (err) {
      dispatch({
        type: "SINGLE_PRODUCT_ERROR",
        payload:
          err.message ||
          "Not able to display this item at the moment, please try again later",
      });
    }
  }, []);

  //******* Admin *******

  const createProduct = async (userToken) => {
    dispatch({ type: "CREATE_PRODUCT_LOADING" });
    try {
      const { data } = await axios.post(
        "/api/products/create",
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      dispatch({
        type: "CREATE_PRODUCT_SUCCESS",
        payload: data.product,
      });
    } catch (err) {
      const message = err.message || "Could not create the product, try again";
      dispatch({ type: "CREATE_PRODUCT_FAIL", payload: message });
    }
  };
  const resetNewProduct = () => {
    dispatch({ type: "CREATE_PRODUCT_RESET" });
  };

  const updateProduct = async (updProduct, userToken) => {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST", payload: updProduct });
    try {
      const { data } = await axios.put(
        `/api/products/${updProduct._id}`, // /api/product/id
        updProduct,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: "UPDATE_PRODUCT_FAIL", payload: message });
    }
  };
  const resetUpdatedProduct = () => {
    dispatch({ type: "UPDATED_PRODUCT_RESET" });
  };
  const deleteProduct = async (productId, userToken) => {
    dispatch({ type: "DELETE_PRODUCT_REQUEST", payload: productId });
    try {
      const { data } = await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "failed to delete product";
      dispatch({ type: "DELETE_PRODUCT_FAIL", payload: message });
    }
  };
  const resetDeleteProduct = () => {
    dispatch({ type: "RESET_DELETE_PRODUCT" });
  };

  useEffect(() => {
    const source = axios.CancelToken.source(); //cleanup
    fetchProducts("/api/products", source);
    return () => {
      source.cancel();
    };
  }, [
    fetchProducts,
    state.success_delete_product,
    state.success_create_product,
    state.success_product_update,
  ]);

  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchSingleProduct,
        clearSingleError,
        closeTopbar,
        toggleTopbar,
        clearError,
        hasError,
        deleteProduct,
        createProduct,
        resetNewProduct,
        updateProduct,
        resetUpdatedProduct,
        resetDeleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductProvider };
