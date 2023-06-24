import axios from "axios";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
} from "./actionTypes";
const usersApiUrl = process.env.REACT_APP_USERS_API_URL;

export const login_loading = () => ({
  type: LOGIN_LOADING,
  payload: [],
});
export const login_success = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const login_error = () => ({
  type: LOGIN_ERROR,
  payload: [],
});

export const signup_loading = (data) => ({
  type: SIGNUP_LOADING,
  payload: data,
});
export const signup_success = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data,
  };
};
export const signup_error = (data) => ({
  type: SIGNUP_ERROR,
  payload: data,
});

export const sendLoginRequest = (obj) => (dispatch) => {
  dispatch(login_loading());
  axios(`${usersApiUrl}?email=${obj.email}&password=${obj.password}`)
    .then((res) => {
      if (res.data.length != 0) {
        const userData = { ...res.data[0], password: null };
        dispatch(login_success(userData));
      } else {
        console.log("user with login data not found")
        dispatch(login_error());
      }
    })
    .catch((err) => {
      console.log("err after login", err);
    });
};

export const sendSignupRequest=(obj)=>(dispatch)=>{
  dispatch(signup_loading())
  axios.post(`${usersApiUrl}`,obj)
  .then((res)=>{
    console.log("res after axios post signup",res)
    dispatch(signup_success({...res.data,password:null}))
  })
  .catch((err)=>{
    console.log("err after signupreq",err)
    dispatch(signup_error())
  })
}
