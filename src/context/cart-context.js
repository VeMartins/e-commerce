import React, { useEffect, useContext, useReducer } from "react";

import cartReducer from "../reducers/cart-reducer";

import {
  ADD_TO_CART,
  UPDATE_AMOUNT,
  GET_TOTAL,
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
} from "../actions";

const initialState = {};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  return (
    <CartContext.Provider value="cart context">{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
