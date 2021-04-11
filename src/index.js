import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/products-context";
import { CartProvider } from "./context/cart-context";
import { FilterProvider } from "./context/filter-context";
import { SigninProvider } from "./context/signin-context";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <SigninProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </SigninProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
