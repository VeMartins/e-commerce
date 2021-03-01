const reducer = (state, action) => {
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
  if (action.type === "DISPLAY_SINGLE_ITEM") {
    return {
      ...state,
      singleProduct: action.payload,
      loading: false,
      error: false,
    };
  }
  if (action.type === "INITIAL_CATEGORIES") {
    return {
      ...state,
      allCategories: allCategories,
      categories: allCategories,
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
  // Cart

  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [], totalAmount: 0 };
  }
  if (action.type === "REMOVE") {
    const filterRemove = () => {
      return state.cart.filter((cartItem) => {
        return cartItem.id !== action.payload;
      });
    };

    return {
      ...state,
      cart: filterRemove(),
    };
  }
  if (action.type === "ADD_TO_CART") {
    let cartCopy = [...state.cart];

    let existingItem = cartCopy.find(
      (cartItem) => cartItem.id === action.payload.product.id
    );

    if (existingItem) {
      existingItem.amount += action.payload.quantity;
      state.totalAmount += action.payload.quantity;
      console.log(existingItem.amount);
    } else {
      state.amount = action.payload.product.amount;
      action.payload.product.amount = action.payload.quantity;
      state.totalAmount = state.totalAmount + action.payload.quantity;
      cartCopy.push(action.payload.product);
    }

    return {
      ...state,
      cart: cartCopy,
    };
  }
  /*if (action.type === "UPDATE_AMOUNT") {
    let cartCopy = [...state.cart];
    let existingItem = cartCopy.find(
      (cartItem) => cartItem.id === action.payload.id
    );
    if (!existingItem) return;

    existingItem.amount += action.payload.quantity;

    return { ...state, cart: cartCopy };
  }*/

  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return {
          ...cartItem,
          amount: cartItem.amount + 1,
        };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart, totalAmount: state.totalAmount + 1 };
  }
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0); // only return the item if the amount does not = to 0
    return { ...state, cart: tempCart, totalAmount: state.totalAmount - 1 };
  }
  if (action.type === "GET_TOTAL") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_CART") {
    return {
      ...state,
      cart: action.payload,
      loading: false,
      error: false,
    };
  }
  if (action.type === "ERROR") {
    return { ...state, loading: false, error: action.payload };
  }
  if (action.type === "CLEAR_ERROR") {
    return { ...state, error: false };
  }
  //return state;
  throw new Error("no matching action type");
};

export default reducer;
