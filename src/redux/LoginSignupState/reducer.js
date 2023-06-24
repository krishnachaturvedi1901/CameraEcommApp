import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS } from "./actionTypes";

const LoginReducer = (
  state = {
    loading: false,
    error: false,
    payload: {},
  },
  { type, payload }
) => {
  switch (type) {
    case LOGIN_LOADING:
      return { ...state, loading: true, payload: {}, error: false };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, payload: payload, error: false };
    case LOGIN_ERROR:
      return { ...state, loading: false, payload: {}, error: true };

    default:
      return state;
  }
};

const SignupReducer = (
  state = {
    loading: false,
    error: false,
    payload: {},
  },
  { type, payload }
) => {
  switch (type) {
    case SIGNUP_LOADING:
      return { ...state, loading: true, payload: {}, error: false };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, payload: payload, error: false };
    case SIGNUP_ERROR:
      return { ...state, loading: false, payload: {}, error: true };

    default:
      return state;
  }
}

export { LoginReducer,SignupReducer };
