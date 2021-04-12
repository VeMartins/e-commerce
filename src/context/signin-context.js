import axios from "axios";
import React, { useContext, useReducer } from "react";

import signinReducer from "../reducers/signin-reducer";

const getLocalStorage = () => {
  let user = localStorage.getItem("userInfo");
  if (user) {
    return JSON.parse(localStorage.getItem("userInfo"));
  } else {
    return null;
  }
};

const initialState = {
  loading: false,
  userInfo: getLocalStorage(),
  error: false,
};

const SigninContext = React.createContext();

const SigninProvider = ({ children }) => {
  const [state, dispatch] = useReducer(signinReducer, initialState);

  const signIn = async (email, password) => {
    dispatch({ type: "USER_SIGNIN_REQUEST", payload: { email, password } });
    try {
      const response = await axios.post("/api/users/signin", {
        email,
        password,
      });
      const user = response.data;

      dispatch({ type: "USER_SIGNIN_SUCCESS", payload: user });
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      dispatch({
        type: "USER_SIGNIN_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  const signOut = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };
  const register = async (name, email, password) => {
    dispatch({
      type: "USER_REGISTER_REQUEST",
      payload: { name, email, password },
    });
    try {
      const response = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      const user = response.data;

      dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
      dispatch({ type: "USER_SIGNIN_SUCCESS", payload: user });
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? "This Email address already exists " ||
              error.response.data.message
            : error.message,
      });
    }
  };

  return (
    <SigninContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        register,
      }}
    >
      {children}
    </SigninContext.Provider>
  );
};

export const useSigninContext = () => {
  return useContext(SigninContext);
};

export { SigninContext, SigninProvider };
