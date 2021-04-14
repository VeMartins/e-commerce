import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, hasInfo, redirect, ...rest }) => {
  //...rest grabs the rest of the component parameters in this case exact path='/checkout'

  return (
    <Route
      {...rest}
      render={() => {
        return hasInfo ? children : <Redirect to={redirect}></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
