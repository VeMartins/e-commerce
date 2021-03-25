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
  if (action.type === "CLEAR_SINGLE_PRODUCT_ERROR") {
    return {
      ...state,
      single_product_error: false,
    };
  }
  if (action.type === "ERROR") {
    return { ...state, loading: false, error: action.payload };
  }
  if (action.type === "CLEAR_ERROR") {
    return { ...state, error: false };
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

  throw new Error(`no matching action type ${action.type}`);
};

export default productsReducer;
