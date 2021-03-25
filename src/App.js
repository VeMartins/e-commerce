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
        <Route exact path="/products/:id">
          <SingleItem />
        </Route>{" "}
        <Route exact path="/signIn">
          <SignIn />
        </Route>
        <Route exact path="/cart">
          <CartContainer />
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
