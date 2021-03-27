import React, { useEffect, useContext, useReducer, useCallback } from "react";

import cartReducer from "../reducers/cart-reducer";

/*import {
  ADD_TO_CART,
  UPDATE_AMOUNT,
  GET_TOTAL,
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
} from "../actions";*/

const initialState = {
  cart: [],
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

  useEffect(() => {
    getTotal();
  }, [state.cart, getTotal]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        addToCart,
        getTotal,
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
