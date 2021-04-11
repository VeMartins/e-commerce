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
} from "./pages";

//components
import { Navbar, Footer, Loading } from "./components";

import { useGlobalContext } from "./context/products-context";

import "./App.css";

function App() {
  const { loading } = useGlobalContext();

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
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
