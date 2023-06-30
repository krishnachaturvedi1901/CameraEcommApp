import axios from "axios";
import {
  GET_ALL_WISHLIST_PROD_SUCCESS,
  WISHLIST_ADDING_ERROR,
  WISHLIST_ADDING_LOADING,
  WISHLIST_ADDING_SUCCESS,
} from "./actionTypes";
const wishlistApiUrl = process.env.REACT_APP_WISHLISTS_API_URL;

export const wishlistAddingLoading = () => ({
  type: WISHLIST_ADDING_LOADING,
  payload: {},
});

export const wishlistAddingSuccess = (data) => ({
  type: WISHLIST_ADDING_SUCCESS,
  payload: data,
});
export const wishlistAddingError = () => ({
  type: WISHLIST_ADDING_ERROR,
  payload: {},
});
export const getAllWishlistProdSuccess = (data) => ({
  type: GET_ALL_WISHLIST_PROD_SUCCESS,
  payload: data,
});

export const whishlistAddingRequest = (obj) => async (dispatch) => {
  dispatch(wishlistAddingLoading())
  axios.post(wishlistApiUrl, obj) 
    .then((res) => {
      console.log("res after wishlist add req-", res);
      if( res.status== 201 && res.statusText== 'Created'){ 
        console.log("Just before getAllreq inside wishlistAff func userId-",obj.userId)
        dispatch(getAllWishlistProducts({userId:obj.userId}))
        dispatch(wishlistAddingSuccess(res.data))
      }
      else{dispatch(wishlistAddingError())}
    })
    .catch((err) => {
      console.log("error after wishlist add request", err);
    });
};


export const getAllWishlistProducts = ({userId}) => (dispatch) => {
  axios(`${wishlistApiUrl}?userId=${userId}`)
    .then((res) => {
      console.log("res after wishlist get all prod req-", res);
      dispatch(getAllWishlistProdSuccess(res.data))
    })
    .catch((err) => {
      console.log("error after wishlist get all prod req", err);
    });
};

export const deleteWishlistProduct = ({wishlistId,userId}) => (dispatch) => {
  console.log("Id getting inside delete func-", wishlistId,"userId-",userId)
  axios
    .delete(`${wishlistApiUrl}/${wishlistId}`)
    .then((res) => {
      console.log("res after wishlist delete prod req-", res);
      if(res.status==200 && res.statusText=="OK"){
        dispatch(getAllWishlistProducts({userId}))
      }
    })
    .catch((err) => {
      console.log("error after wishlist delete prod req", err);
    });
};
