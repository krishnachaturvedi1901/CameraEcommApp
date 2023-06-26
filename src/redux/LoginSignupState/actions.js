import axios from "axios";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
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

export const signup_loading = () => ({
  type: SIGNUP_LOADING,
  payload: [],
});
export const signup_success = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data,
  };
};
export const signup_error = () => ({
  type: SIGNUP_ERROR,
  payload: [],
});

export const logout_success = () => {
  return {
    type: LOGOUT_SUCCESS,
    payload: {},
  };
};


export const sendLoginRequest = (obj) => (dispatch) => {
  dispatch(login_loading());
  axios(`${usersApiUrl}?email=${obj.email}&password=${obj.password}`)
    .then(async(res) => {
      if (res.data.length != 0 && res.data) {
        const userData = { ...res.data[0] };
        const loginStatusUpdatedResponse=await updateUserLoginStatus(userData.id)
        if(loginStatusUpdatedResponse){dispatch(login_success(loginStatusUpdatedResponse));}
        else{dispatch(login_error());}
      } else {
        console.log("user with login data not found")
        dispatch(login_error());
      }
    })
    .catch((err) => {
      console.log("err after login", err);
    });
};

const updateUserLoginStatus=async(id)=>{
  try {
    let res=await axios.patch(`${usersApiUrl}/${id}`,{login:true})
    return {...res.data,password:null,repassword:null}
  } catch (error) {
    console.log("Error in updating login status",error)
  }
}

export const sendSignupRequest=(obj)=>(dispatch)=>{
  dispatch(signup_loading())
  axios.post(`${usersApiUrl}`,obj)
  .then((res)=>{
    dispatch(signup_success({...res.data,password:null,repassword:null}))
  })
  .catch((err)=>{
    console.log("err after signupreq",err)
    dispatch(signup_error())
  })
}

export const sendLogoutRequest=(id)=>async(dispatch)=>{
  console.log("id in logout func",id)
  try {
    let res=await axios.patch(`${usersApiUrl}/${id}`,{login:false})
    console.log("res after logout",res)
    dispatch(logout_success())
  } catch (error) {
    console.log("Error in updating login status",error)
  }

}
