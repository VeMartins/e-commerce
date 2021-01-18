import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
//pages
import Home from "./pages/Home";
import About from "./pages/About";
import SingleItem from "./pages/SingleItem";
import Error from "./pages/Error";
import CartContainer from "./pages/CartContainer";
import ContactUs from "./pages/ContactUs";
//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/help">
          <ContactUs />
        </Route>
        <Route exact path="/item/:id">
          <SingleItem />
        </Route>
        <Route exact path="/cart">
          <CartContainer />
        </Route>
        <Route exact path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
