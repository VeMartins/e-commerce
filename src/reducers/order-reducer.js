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
      };
    case "ORDER_DETAILS_REQUEST":
      return {
        ...state,
        loading: false,
        error: false,
      };
    case "ORDER_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        orderDetails: action.payload,
      };
    case "ORDER_DETAILS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ORDER_PAY_REQUEST":
      return { ...state, loading: true };
    case "ORDER_PAY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        orderDetails: action.payload,
      };
    case "ORDER_PAY_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
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
        loading: false,
        orderDetails: initialOrderDetails,
        success: false,
        error: false,
      };
    case "USER_ORDER_LIST_REQUEST":
      return { ...state, loading: true };
    case "USER_ORDER_LIST_SUCCESS":
      return {
        ...state,
        orderList: action.payload,
        loading: false,
        error: false,
      };
    case "USER_ORDER_LIST_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_ORDER_LIST_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_ORDER_LIST_SUCCESS":
      return {
        ...state,
        adminOrderList: action.payload,
        loading: false,
        error: false,
      };
    case "ADMIN_ORDER_LIST_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_DELETE_ORDER_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_DELETE_ORDER_SUCCESS":
      return {
        ...state,
        success: true,
        loading: false,
        error: false,
      };
    case "ADMIN_DELETE_ORDER_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    case "ADMIN_ORDER_RESET":
      return {
        ...state,
        error: false,
        loading: false,
        success: false,
      };
    case "ORDER_DELIVERY_REQUEST":
      return { ...state, loading: true };
    case "ORDER_DELIVERY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        orderDetails: action.payload,
      };
    case "ORDER_DELIVERY_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`no matching action type ${action.type}`);
  }
};

export default orderReducer;
