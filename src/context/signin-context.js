import axios from "axios";
import React, { useContext, useReducer, useCallback } from "react";

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
  userDetails: null,
  success: false,
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
    localStorage.removeItem("cartBotanica");
    localStorage.removeItem("shipping");
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

  const getUserDetails = useCallback(
    async (id) => {
      dispatch({ type: "USER_DETAILS_REQUEST", payload: id });
      try {
        const response = await axios.get(`api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${state.userInfo.token}`,
          },
        });
        const userDetails = response.data;
        dispatch({ type: "USER_DETAILS_SUCCESS", payload: userDetails });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: "USER_DETAILS_FAIL", payload: message });
      }
    },
    [state.userInfo]
  );

  const updateUserProfile = async (user) => {
    dispatch({
      type: "UPDATE_PROFILE_REQUEST",
      payload: user,
    });
    try {
      const response = await axios.put("/api/users/userprofile", user, {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      });
      const updatedUser = response.data;

      dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: updatedUser });
      dispatch({ type: "USER_SIGNIN_SUCCESS", payload: updatedUser });
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: "UPDATE_PROFILE_FAIL",
        payload: message,
      });
    }
  };
  const resetUserProfile = useCallback(() => {
    dispatch({ type: "RESET_USER_PROFILE" });
  }, []);
  return (
    <SigninContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        register,
        getUserDetails,
        updateUserProfile,
        resetUserProfile,
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
