import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//pages
import Home from "./pages/Home";
import About from "./pages/About";
import SingleItem from "./pages/SingleItem";
import Error from "./pages/Error";
import CartContainer from "./pages/CartContainer";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignIn";
//components
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Loading from "./components/shared/Loading";
import { useGlobalContext } from "./context/context";

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
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/help">
          <ContactUs />
        </Route>
        <Route exact path="/:title/:id">
          <SingleItem />
        </Route>
        <Route exact path="/signIn">
          <SignIn />
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
