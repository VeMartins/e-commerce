const productsReducer = (state, action) => {
  //Initial State

  const allCategories = [
    "all",
    ...new Set(state.data.map((item) => item.category)),
  ];
  if (action.type === "DISPLAY_ITEMS") {
    return {
      ...state,
      products: action.payload,
      data: action.payload,
      filteredData: [...action.payload],
      loading: false,
      error: false,
    };
  }
  if (action.type === "LOAD_PRODUCTS") {
    return {
      ...state,
    };
  }

  if (action.type === "INITIAL_CATEGORIES") {
    return {
      ...state,
      allCategories: allCategories,
      categories: allCategories,
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

  //Filter and sort Items

  if (action.type === "FILTER_ITEMS") {
    const allItems = [...state.data];
    state.products = allItems;
    if (action.payload === state.sortValue) {
      return { ...state, products: allItems, filteredData: allItems };
    }
    const filterByCategories = () => {
      return state.products.filter((item) => {
        return item.category === action.payload;
      });
    };
    return {
      ...state,
      products: filterByCategories(),
      filteredData: filterByCategories(),
    };
  }

  if (action.type === "SORT_ITEMS") {
    function compareValues(sortBy, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(sortBy) || !b.hasOwnProperty(sortBy)) {
          return 0;
        }

        const itemA =
          typeof a[sortBy] === "string" ? a[sortBy].toUpperCase() : a[sortBy];
        const itemB =
          typeof b[sortBy] === "string" ? b[sortBy].toUpperCase() : b[sortBy];

        let comparison = 0;
        if (itemA > itemB) {
          comparison = 1;
        } else if (itemA < itemB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    }
    const newArr = [...state.filteredData];
    let sorted;
    switch (action.payload) {
      case "alph-az":
        sorted = newArr.sort(compareValues("title"));
        return { ...state, products: sorted, filterValue: "alph-az" };

      case "alph-za":
        sorted = newArr.sort(compareValues("title", "desc"));
        return { ...state, products: sorted, filterValue: "alph-za" };

      case "price-low":
        sorted = newArr.sort(compareValues("price"));
        return { ...state, products: sorted, filterValue: "price-low" };

      case "price-high":
        sorted = newArr.sort(compareValues("price", "desc"));
        return { ...state, products: sorted, filterValue: "price-high" };

      default:
        sorted = newArr.sort(compareValues("title"));
        return { ...state, products: sorted, filterValue: "alph-az" };
    }
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

  //return state;
  throw new Error(`no matching action type ${action.type}`);
};

export default productsReducer;
