const filter_reducer = (state, action) => {
  const { data } = state;
  const allCategories = ["all", ...new Set(data.map((item) => item.category))];

  if (action.type === "LOAD_PRODUCTS") {
    return {
      ...state,
      filteredData: [...action.payload],
      data: [...action.payload],
    };
  }
  if (action.type === "UPDATE_SORT") {
    return { ...state, sortValue: action.payload };
  }
  if (action.type === "SORT_PRODUCTS") {
    const { sortValue, filteredData } = state;
    let tempProducts = [...filteredData];
    if (sortValue === "price-low") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sortValue === "price-high") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sortValue === "name-az") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    if (sortValue === "name-za") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }

    return { ...state, filteredData: tempProducts };
  }
  /* ********************************************************* */
  if (action.type === "INITIAL_CATEGORIES") {
    return {
      ...state,
      allCategories: allCategories,
      categories: allCategories,
    };
  }
  if (action.type === "FILTER_ITEMS") {
    const allItems = [...data];

    if (action.payload === "all") {
      return { ...state, filteredData: allItems, filterValue: "all" };
    }
    const filterByCategories = () => {
      return data.filter((item) => {
        return item.category === action.payload;
      });
    };
    return {
      ...state,
      filteredData: filterByCategories(),
      filterValue: action.payload,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
