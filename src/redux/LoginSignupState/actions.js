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

const login_loading = () => ({
  type: LOGIN_LOADING,
  payload: [],
});
const login_success = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});
const login_error = () => ({
  type: LOGIN_ERROR,
  payload: [],
});

const signup_loading = (data) => ({
  type: SIGNUP_LOADING,
  payload: data,
});
const signup_success = (data) => {
    console.log("DATA INSIDE ACTION",data)
    return {
  type: SIGNUP_SUCCESS,
  payload: data,
}};
const signup_error = (data) => ({
  type: SIGNUP_ERROR,
  payload: data,
});

export const sendLoginRequest = (obj) => (dispatch) => {
  console.log("getting auth data in loginReqFunc", obj);
  dispatch(login_loading());
  axios(`${usersApiUrl}?email=${obj.email}&password=${obj.password}`)
    .then((res) => {
      if (res.data.length!=0) {
        console.log("res after login", { ...res.data[0], password: null });
        dispatch(login_success({ ...res.data[0], password: null }));
      } else {
        console.log("login error  called");
        dispatch(login_error());
      }
    })
    .catch((err) => {
      console.log("err after login", err);
    });
};
