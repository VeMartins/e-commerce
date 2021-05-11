import React, { useEffect, useContext, useReducer } from "react";

import cartReducer from "../reducers/cart-reducer";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cartBotanica");
  if (cart) {
    return JSON.parse(localStorage.getItem("cartBotanica"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total: 0, //total price
  amount: 0, //total items
};

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  //cart actions
  const addToCart = (product, quantity, id) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity, id } });
  };

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
  const emptyCart = () => {
    dispatch({ type: "CART_EMPTY" });
    localStorage.removeItem("cartBotanica");
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
    localStorage.setItem("cartBotanica", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        addToCart,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContext, CartProvider };
