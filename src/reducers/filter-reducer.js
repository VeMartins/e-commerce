const filter_reducer = (state, action) => {
  if (action.type === "LOAD_PRODUCTS") {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      filteredData: [...action.payload],
      data: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === "UPDATE_SORT") {
    return { ...state, sortValue: action.payload };
  }
  if (action.type === "SORT_PRODUCTS") {
    const { sortValue, filteredData } = state;
    let tempProducts = [...filteredData];
    if (sortValue === "price-low") {
      tempProducts = tempProducts.sort((a, b) => {
        let amin;
        let bmin;
        if (a.sale > 0) {
          amin = Math.min(a.price, a.sale);
        } else {
          amin = a.price;
        }
        if (b.sale > 0) {
          bmin = Math.min(b.price, b.sale);
        } else {
          bmin = b.price;
        }
        return amin - bmin;
      });
    }
    if (sortValue === "price-high") {
      tempProducts = tempProducts.sort((a, b) => {
        let amax;
        let bmax;
        if (a.sale > 0) {
          amax = Math.min(a.price, a.sale);
        } else {
          amax = a.price;
        }
        if (b.sale > 0) {
          bmax = Math.min(b.price, b.sale);
        } else {
          bmax = b.price;
        }
        return bmax - amax;
      });
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

  if (action.type === "FILTER_ITEMS") {
    const { name, value } = action.payload;

    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }

  if (action.type === "SET_FILTERS") {
    const { data } = state;
    const { category, price, text } = state.filters;
    let tempProducts = [...data];
    if (category !== "all products") {
      tempProducts = tempProducts.filter((item) => item.category === category);
    }
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.title.toLowerCase().startsWith(text);
      });
    }
    //price
    tempProducts = tempProducts.filter((product) => {
      let p;

      if (product.sale > 0) {
        p = product.sale;
      } else {
        p = product.price;
      }

      return p <= price;
    });

    return { ...state, filteredData: tempProducts };
  }
  if (action.type === "CLEAR_FILTERS") {
    return {
      ...state,
      filters: {
        ...state.filters,
        category: "all products",
        price: state.filters.max_price,
      },
    };
  }
  if (action.type === "FILTERSELECT") {
    const { name, value } = action.payload;

    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }

  if (action.type === "MENU_CLOSE") {
    return { ...state, showMenu: false };
  }
  if (action.type === "MENU_TOGGLE") {
    return { ...state, showMenu: !state.showMenu };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
