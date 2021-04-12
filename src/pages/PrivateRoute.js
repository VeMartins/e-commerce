import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useSigninContext } from "../context/signin-context";

const PrivateRoute = ({ children, ...rest }) => {
  //...rest grabs the rest of the component parameters in this case exact path='/checkout'
  const { userInfo } = useSigninContext();

  return (
    <Route
      {...rest}
      render={() => {
        return userInfo ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
