import React from "react";
import ReactDOM from "react-dom";
import { SigninProvider } from "./context/signin-context";
import { ProductProvider } from "./context/products-context";
import { OrderProvider } from "./context/order-context";
import { CartProvider } from "./context/cart-context";
import { FilterProvider } from "./context/filter-context";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <SigninProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <FilterProvider>
              <App />
            </FilterProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </SigninProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
