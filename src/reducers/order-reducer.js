const orderReducer = (state, action) => {
  switch (action.type) {
    case "CART_SAVE_SHIPPING_ADDRESS":
      return { ...state, shippingAddress: action.payload };
    case "CART_SAVE_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    case "CLEAR_SHIPPING_DATA":
      const initialShipping = {
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
      };

      return { ...state, shippingAddress: initialShipping };
    case "LOAD_ORDER_ITEMS":
      return { ...state, orderItems: action.payload };
    case "CREATE_ORDER_REQUEST":
      return { ...state, loading: true, error: false };
    case "CREATE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        success: true,

        order: action.payload,
      };
    case "CREATE_ORDER_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_ORDER_RESET":
      return { ...state, shippingAddress: {}, order: {}, success: false };

    default:
      throw new Error(`no matching action type ${action.type}`);
  }
};

export default orderReducer;
