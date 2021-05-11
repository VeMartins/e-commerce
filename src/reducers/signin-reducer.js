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
    case "USER_REGISTER_REQUEST":
      return { ...state, loading: true };
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        userInfo: action.payload,
      };
    case "USER_REGISTER_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAILS_SUCCESS":
      return { ...state, loading: false, userDetails: action.payload };
    case "USER_DETAILS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "UPDATE_PROFILE_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        userDetails: action.payload,
      };
    case "UPDATE_PROFILE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case "RESET_USER_PROFILE":
      return { ...state, loading: false, error: false, success: false };
    case "SEND_EMAIL_REQUEST":
      return { ...state, loading: true };
    case "SEND_EMAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        emailSms: action.payload,
      };
    case "SEND_EMAIL_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      throw new Error(`no matching action type ${action.type}`);
  }
};

export default signinReducer;
