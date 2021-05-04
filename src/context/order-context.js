import axios from "axios";
import React, { useContext, useReducer, useEffect, useCallback } from "react";

import orderReducer from "../reducers/order-reducer";
import { useCartContext } from "./cart-context";
import { useSigninContext } from "./signin-context";

const getLocalStorage = () => {
  let address = localStorage.getItem("shipping");
  if (address) {
    return JSON.parse(localStorage.getItem("shipping"));
  } else {
    return {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    };
  }
};

const initialState = {
  shippingAddress: getLocalStorage(),
  paymentMethod: "PayPal",
  shippingPrice: 800,
  taxPercentage: 0.15,
  orderItems: [],
  error: false,
  loading: false,
  success: false,
  order: { message: "", order: "" },
  orderDetails: {
    message: "",
    order: {
      shippingAddress: {},
      orderItems: [],
    },
  },
  orderList: [],
  adminOrderList: [],
};

const OrderContext = React.createContext();

const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const { userInfo } = useSigninContext();
  const { emptyCart, cart } = useCartContext();

  useEffect(() => {
    dispatch({ type: "LOAD_ORDER_ITEMS", payload: cart });
  }, [cart]);

  const saveShippingAddress = (data) => {
    dispatch({ type: "CART_SAVE_SHIPPING_ADDRESS", payload: data });
    localStorage.setItem("shipping", JSON.stringify(data));
  };

  const savePaymentMethod = (data) => {
    dispatch({ type: "CART_SAVE_PAYMENT_METHOD", payload: data });
  };
  const clearShippingData = () => {
    dispatch({ type: "CLEAR_SHIPPING_DATA" });
  };

  const createOrder = async (order) => {
    dispatch({ type: "CREATE_ORDER_REQUEST", payload: order });
    try {
      const response = await axios.post("/api/orders", order, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const orderData = response.data;

      dispatch({ type: "CREATE_ORDER_SUCCESS", payload: orderData });
    } catch (error) {
      dispatch({
        type: "CREATE_ORDER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  const orderReset = () => {
    dispatch({ type: "CREATE_ORDER_RESET" });
    emptyCart();
  };

  const detailsOrder = async (orderId) => {
    dispatch({ type: "ORDER_DETAILS_REQUEST", payload: orderId });

    try {
      const response = await axios.get(`/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const orderData = response.data;

      dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: orderData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: "ORDER_DETAILS_FAIL", payload: message });
    }
  };
  const payOrder = async (order, paymentResult) => {
    dispatch({ type: "ORDER_PAY_REQUEST", payload: { order, paymentResult } });

    try {
      const response = await axios.put(
        `/api/order/${order._id}/pay`,
        paymentResult,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      const payData = response.data;

      dispatch({ type: "ORDER_PAY_SUCCESS", payload: payData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: "ORDER_PAY_FAIL", payload: message });
    }
  };

  const ordersReset = () => {
    dispatch({ type: "ORDER_PAY_RESET" });
    dispatch({ type: "ADMIN_ORDER_RESET" });
  };

  const getUserOrderList = useCallback(async () => {
    dispatch({ type: "USER_ORDER_LIST_REQUEST" });

    try {
      const response = await axios.get(`/api/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const ordersList = response.data;

      dispatch({ type: "USER_ORDER_LIST_SUCCESS", payload: ordersList });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: "USER_ORDER_LIST_FAIL", payload: message });
    }
  }, [userInfo]);

  const getAdminOrdersList = useCallback(async () => {
    dispatch({ type: "ADMIN_ORDER_LIST_REQUEST" });

    try {
      const response = await axios.get(`/api/orders`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const ordersList = response.data;

      dispatch({ type: "ADMIN_ORDER_LIST_SUCCESS", payload: ordersList });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: "ADMIN_ORDER_LIST_FAIL", payload: message });
    }
  }, [userInfo]);

  const deleteOrder = async (orderID) => {
    dispatch({ type: "ADMIN_DELETE_ORDER_REQUEST" });
    try {
      const response = await axios.delete(`/api/order/${orderID}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const orderDeleted = response.data;
      dispatch({ type: "ADMIN_DELETE_ORDER_SUCCESS", payload: orderDeleted });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: "ADMIN_DELETE_ORDER_FAIL", payload: message });
    }
  };
  const adminOrderReset = useCallback(() => {
    dispatch({ type: "ADMIN_ORDER_RESET" });
  }, []);

  const deliverOrder = async (orderId) => {
    dispatch({ type: "ORDER_DELIVERY_REQUEST", payload: orderId });

    try {
      const response = await axios.put(
        `/api/order/${orderId}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      const deliveryData = response.data;

      dispatch({ type: "ORDER_DELIVERY_SUCCESS", payload: deliveryData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: "ORDER_DELIVERY_FAIL", payload: message });
    }
  };
  return (
    <OrderContext.Provider
      value={{
        ...state,
        saveShippingAddress,
        savePaymentMethod,
        createOrder,
        clearShippingData,
        orderReset,
        detailsOrder,
        payOrder,
        ordersReset,
        getUserOrderList,
        getAdminOrdersList,
        deleteOrder,
        adminOrderReset,
        deliverOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderContext, OrderProvider };
