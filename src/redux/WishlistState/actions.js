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

export const wishlistAddingSuccess = () => ({
  type: WISHLIST_ADDING_SUCCESS,
  payload: {},
});
export const wishlistAddingError = () => ({
  type: WISHLIST_ADDING_ERROR,
  payload: {},
});
export const getAllWishlistProdSuccess = () => ({
  type: GET_ALL_WISHLIST_PROD_SUCCESS,
  payload: {},
});

export const whishlistAddingRequest = (obj) => async (dispatch) => {
  await checkProductAlreadyExistTemp(obj).then((res) => {
    console.log("product geeting inside wishlistAddFuc", obj, res);
  })
  .catch((err)=>console.log(err))

  axios
    .post(wishlistApiUrl, obj)
    .then((res) => {
      console.log("res after wishlist add req-", res);
    })
    .catch((err) => {
      console.log("error after wishlist add request", err);
    });
};

const checkProductAlreadyExistTemp = ({ userId, productId }) => {
  axios(`${wishlistApiUrl}?productId=${productId}&userId=${userId}`)
    .then((res) => {
      console.log("res after wishlist get one prodTemp req-", res);
      return res.data ? true : false;
    })
    .catch((err) => {
      console.log("error after wishlist get one prodTemp req", err);
    });
};

export const checkProductAlreadyExist = ({ userId, productId }) => (
  dispatch
) => {
  axios(`${wishlistApiUrl}?productId=${productId}&userId=${userId}`)
    .then((res) => {
      console.log("res after wishlist get one prod req-", res);
      return res.data ? true : false;
    })
    .catch((err) => {
      console.log("error after wishlist get one prod req", err);
    });
};

export const getAllWishlistProducts = () => (dispatch) => {
  axios(wishlistApiUrl)
    .then((res) => {
      console.log("res after wishlist get all prod req-", res);
    })
    .catch((err) => {
      console.log("error after wishlist get all prod req", err);
    });
};

export const deleteWishlistProduct = (id) => (dispatch) => {
  axios
    .delete(`${wishlistApiUrl}/${id}`)
    .then((res) => {
      console.log("res after wishlist delete prod req-", res);
    })
    .catch((err) => {
      console.log("error after wishlist delete prod req", err);
    });
};
