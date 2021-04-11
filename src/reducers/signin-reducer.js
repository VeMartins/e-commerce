const signinReducer = (state, action) => {
  switch (action.type) {
    case "USER_SIGNIN_REQUEST":
      return { ...state, loading: true };
    case "USER_SIGNIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        userInfo: action.payload,
      };
    case "USER_SIGNIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_SIGNOUT":
      return { ...state, userInfo: null };
    default:
      throw new Error(`no matching action type ${action.type}`);
  }
};

export default signinReducer;
