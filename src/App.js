import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//pages
import {
  Products,
  Home,
  SingleItem,
  Error,
  Cart,
  ContactUs,
  SignIn,
  Register,
  Checkout,
  PrivateRoute,
  PaymentMethod,
  PlaceOrder,
  OrderDetails,
  OrderHistory,
  UserProfile,
  ProductListAdmin,
} from "./pages";

//components
import { Navbar, Footer, Loading } from "./components";

import {
  useProductContext,
  useSigninContext,
  useOrderContext,
} from "./context";

import "./App.css";

function App() {
  const { loading } = useProductContext();
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
          <Home />
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
          <Cart />
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
        <PrivateRoute exact path="/userprofile" hasInfo={userInfo} redirect="/">
          <UserProfile />
        </PrivateRoute>
        {/* ************* Admin Routes ***********  */}
        <PrivateRoute
          exact
          path="/productlist"
          hasInfo={userInfo && userInfo.isAdmin}
          redirect="/"
        >
          <ProductListAdmin />
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
