const cartReducer = (state, action) => {
  let tempCart;
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE":
      const filterRemove = () => {
        return state.cart.filter((cartItem) => {
          return cartItem.id !== action.payload;
        });
      };

      return {
        ...state,
        cart: filterRemove(),
      };

    case "ADD_TO_CART":
      const { id, quantity, product } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id);
      if (tempItem) {
        const cartCopy = state.cart.map((cartItem) => {
          if (cartItem.id === id) {
            let newAmount = cartItem.amount + quantity;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: cartCopy };
      } else {
        const newItem = {
          id: id,
          name: product.title,
          amount: quantity,
          image: product.img,
          price: product.price,
          max: product.stock,
          sale: product.sale,
        };

        return { ...state, cart: [...state.cart, newItem] };
      }

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
      return { ...state, cart: tempCart };

    case "DECREASE":
      tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0); // only return the item if the amount does not = to 0
      return { ...state, cart: tempCart };

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
