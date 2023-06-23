import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from "./actionTypes";

const LoginReducer = (
  state = {
    loading: true,
    error: false,
    payload: {},
  },
  { type, data }
) => {
    console.log("payload in side reducse",data)
  switch (type) {
    case LOGIN_LOADING:
      return state;
    case LOGIN_SUCCESS:
        console.log("payload in side reducse",data)
      return { ...state, loading: false, payload: data, error: false };
    case LOGIN_ERROR:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export { LoginReducer };
