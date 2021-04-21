import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//pages
import {
  Products,
  About,
  SingleItem,
  Error,
  CartContainer,
  ContactUs,
  SignIn,
  Register,
  Checkout,
  PrivateRoute,
  PaymentMethod,
  PlaceOrder,
  OrderDetails,
  OrderHistory,
} from "./pages";

//components
import { Navbar, Footer, Loading } from "./components";

import { useGlobalContext } from "./context/products-context";
import { useSigninContext } from "./context/signin-context";
import { useOrderContext } from "./context/order-context";

import "./App.css";

function App() {
  const { loading } = useGlobalContext();
  const { userInfo } = useSigninContext();
  const { shippingAddress } = useOrderContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/help">
          <ContactUs />
        </Route>
        <Route path={"/product/:id"}>
          <SingleItem />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/cart">
          <CartContainer />
        </Route>
        <PrivateRoute
          exact
          path="/checkout"
          hasInfo={userInfo}
          redirect="/signin"
        >
          <Checkout />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/payment"
          hasInfo={shippingAddress.address}
          redirect="/checkout"
        >
          <PaymentMethod />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/orders"
          hasInfo={shippingAddress.address}
          redirect="/checkout"
        >
          <PlaceOrder />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/order/:orderId"
          hasInfo={userInfo}
          redirect="/"
        >
          <OrderDetails />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/orderhistory"
          hasInfo={userInfo}
          redirect="/"
        >
          <OrderHistory />
        </PrivateRoute>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
