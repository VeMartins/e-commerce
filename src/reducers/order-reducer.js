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
      return {
        ...state,
        shippingAddress: {},
        success: false,
        loading: false,
        loadingDetails: false,
        successPay: false,
      };
    case "ORDER_DETAILS_REQUEST":
      return { ...state, loadingDetails: true, errorDetails: false };
    case "ORDER_DETAILS_SUCCESS":
      return {
        ...state,
        loadingDetails: false,
        errorDetails: false,
        orderDetails: action.payload,
      };
    case "ORDER_DETAILS_FAIL":
      return { ...state, loadingDetails: false, errorDetails: action.payload };
    case "ORDER_PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "ORDER_PAY_SUCCESS":
      return {
        ...state,
        loadingPay: false,
        loadingDetails: false,
        successPay: true,
        orderDetails: action.payload,
      };
    case "ORDER_PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "ORDER_PAY_RESET":
      const initialOrderDetails = {
        message: "",
        order: {
          shippingAddress: {},
          orderItems: [],
        },
      };
      return {
        ...state,
        loadingPay: false,
        orderDetails: initialOrderDetails,
        successPay: false,
      };
    default:
      throw new Error(`no matching action type ${action.type}`);
  }
};

export default orderReducer;
