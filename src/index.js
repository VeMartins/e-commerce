import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductProvider } from "./context/products-context";
import { CartProvider } from "./context/cart-context";
import { FilterProvider } from "./context/filter-context";
import { SigninProvider } from "./context/signin-context";
import { OrderProvider } from "./context/order-context";

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <SigninProvider>
        <FilterProvider>
          <CartProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </CartProvider>
        </FilterProvider>
      </SigninProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
