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
      single_product_loading: true,
      single_product_error: false,
    };
  }
  if (action.type === "DISPLAY_SINGLE_PRODUCT") {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }
  if (action.type === "SINGLE_PRODUCT_ERROR") {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: action.payload,
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
      single_product_error: false,
      single_product_stock_error: false,
      error_product_update: false,
    };
  }
  if (action.type === "ERROR") {
    return { ...state, loading: false, error: action.payload };
  }
  if (action.type === "CLEAR_ERROR") {
    return {
      ...state,
      error: false,
      new_product_error: false,
      delete_error: false,
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
      success_create_product: true,
      new_product_error: false,
    };
  }
  if (action.type === "CREATE_PRODUCT_FAIL") {
    return {
      ...state,
      loading: false,
      new_product_error: action.payload,
      success_create_product: false,
    };
  }
  if (action.type === "CREATE_PRODUCT_RESET") {
    return {
      ...state,
      loading: false,
      new_product_error: false,
      success_create_product: false,
      new_product: {},
    };
  }
  if (action.type === "UPDATE_PRODUCT_REQUEST") {
    return {
      ...state,
      loading_product_update: true,
    };
  }
  if (action.type === "UPDATE_PRODUCT_SUCCESS") {
    return {
      ...state,
      loading_product_update: false,
      error_product_update: false,
      success_product_update: true,
      updated_product: action.payload,
    };
  }
  if (action.type === "UPDATE_PRODUCT_FAIL") {
    return {
      ...state,
      loading_product_update: false,
      error_product_update: action.payload,
      success_product_update: false,
    };
  }
  if (action.type === "UPDATED_PRODUCT_RESET") {
    return {
      ...state,
      success_product_update: false,
      updated_product: {},
      error_product_update: false,
      loading_product_update: false,
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
      delete_error: false,
      success_delete_product: true,
    };
  }
  if (action.type === "DELETE_PRODUCT_FAIL") {
    return {
      ...state,
      loading: false,
      delete_error: action.payload,
      success_delete_product: false,
    };
  }
  if (action.type === "RESET_DELETE_PRODUCT") {
    return {
      ...state,
      success_delete_product: false,
      delete_error: false,
      loading: false,
    };
  }
  throw new Error(`no matching action type ${action.type}`);
};

export default productsReducer;
