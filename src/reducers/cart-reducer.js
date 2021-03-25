const cartReducer = (state, action) => {
  let tempCart;
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [], totalAmount: 0 };

    case "REMOVE":
      const filterRemove = () => {
        return state.cart.filter((cartItem) => {
          return cartItem.id !== action.payload;
        });
      };

      return {
        ...state,
        cart: filterRemove(),
        //totalAmount: state.totalAmount - tempAmount.length,
      };

    case "ADD_TO_CART":
      let cartCopy = [...state.cart];

      let existingItem = cartCopy.find(
        (cartItem) => cartItem.id === action.payload.product.id
      );
      if (action.payload.product.stock === 0) {
        return;
      }
      if (existingItem) {
        // individual item number of items
        existingItem.amount += action.payload.quantity;

        //total items number
        state.totalAmount += action.payload.quantity;
      } else {
        // individual item number of items
        state.amount = action.payload.product.amount;
        action.payload.product.amount = action.payload.quantity;

        //total items number
        state.totalAmount = state.totalAmount + action.payload.quantity;
        //adding product to cart
        cartCopy.push(action.payload.product);
      }

      return {
        ...state,
        cart: cartCopy,
      };

    case "INCREASE":
      tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return {
            ...cartItem,
            amount: cartItem.amount + 1,
          };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart, totalAmount: state.totalAmount + 1 };

    case "DECREASE":
      tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0); // only return the item if the amount does not = to 0
      return { ...state, cart: tempCart, totalAmount: state.totalAmount - 1 };

    case "GET_TOTAL":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount, sale } = cartItem;
          let itemTotal;

          if (sale > 0) {
            itemTotal = sale * amount;
          } else {
            itemTotal = price * amount;
          }

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

    default:
      throw new Error(`no matching action type ${action.type}`);
  }
};

export default cartReducer;

/*if (action.type === "UPDATE_AMOUNT") {
  let cartCopy = [...state.cart];
  let existingItem = cartCopy.find(
    (cartItem) => cartItem.id === action.payload.id
  );
  if (!existingItem) return;

  existingItem.amount += action.payload.quantity;

  return { ...state, cart: cartCopy };
}*/
/*const updateInventory = useCallback((id, product) => {
    setInventory(product.stock);
    setProduct(
      product.id === id ? { ...product, stock: product.stock - 1 } : product
    );
  }, []);*/
