const productsReducer = (state, action) => {
  if (action.type === "DISPLAY_ITEMS") {
    const featured = action.payload.filter(
      (product) => product.featured === true
    );
    return {
      ...state,
      products: action.payload,
      loading: false,
      error: false,
      featured_products: featured,
    };
  }

  if (action.type === "SINGLE_PRODUCT_LOADING") {
    return {
      ...state,
      loading: false,
      error: false,
    };
  }
  if (action.type === "DISPLAY_SINGLE_PRODUCT") {
    return {
      ...state,
      loading: false,
      single_product: action.payload,
    };
  }
  if (action.type === "SINGLE_PRODUCT_ERROR") {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }
  if (action.type === "SINGLE_PRODUCT_STOCK_ERROR") {
    return {
      ...state,
      single_product_stock_error: action.payload,
    };
  }
  if (action.type === "CLEAR_SINGLE_PRODUCT_ERROR") {
    return {
      ...state,
      loading: false,
      single_product_stock_error: false,
      error: false,
      success: false,
    };
  }
  if (action.type === "ERROR") {
    return { ...state, loading: false, error: action.payload };
  }
  if (action.type === "CLEAR_ERROR") {
    return {
      ...state,
      error: false,
    };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "TOPBAR_CLOSE") {
    return { ...state, showLinks: false };
  }
  if (action.type === "TOPBAR_TOGGLE") {
    return { ...state, showLinks: !state.showLinks };
  }
  if (action.type === "CREATE_PRODUCT_LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "CREATE_PRODUCT_SUCCESS") {
    return {
      ...state,
      loading: false,
      new_product: action.payload,
      success: true,
      error: false,
    };
  }
  if (action.type === "CREATE_PRODUCT_FAIL") {
    return {
      ...state,
      loading: false,
      error: action.payload,
      success: false,
    };
  }
  if (action.type === "CREATE_PRODUCT_RESET") {
    return {
      ...state,
      loading: false,
      error: false,
      success: false,
      new_product: {},
    };
  }
  if (action.type === "UPDATE_PRODUCT_REQUEST") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "UPDATE_PRODUCT_SUCCESS") {
    return {
      ...state,
      loading: false,
      error: false,
      success: true,
      updated_product: action.payload,
    };
  }
  if (action.type === "UPDATE_PRODUCT_FAIL") {
    return {
      ...state,
      error: action.payload,
      loading: false,
      success: false,
    };
  }
  if (action.type === "UPDATED_PRODUCT_RESET") {
    return {
      ...state,
      success: false,
      updated_product: {},
      error: false,
      loading: false,
    };
  }
  if (action.type === "DELETE_PRODUCT_REQUEST") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "DELETE_PRODUCT_SUCCESS") {
    return {
      ...state,
      loading: false,
      error: false,
      success: true,
    };
  }
  if (action.type === "DELETE_PRODUCT_FAIL") {
    return {
      ...state,
      loading: false,
      error: action.payload,
      success: false,
    };
  }
  if (action.type === "RESET_DELETE_PRODUCT") {
    return {
      ...state,
      success: false,
      error: false,
      loading: false,
    };
  }
  throw new Error(`no matching action type ${action.type}`);
};

export default productsReducer;
