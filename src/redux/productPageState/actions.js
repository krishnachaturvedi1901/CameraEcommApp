import axios from "axios";
import {
  PRODUCTS_ERROR,
  PRODUCTS_LOADING,
  PRODUCTS_SUCCESS,
} from "./actionTypes";

export const productsLoading = () => ({
  type: PRODUCTS_LOADING,
  payload: {},
});

export const productsSuccess = (data, productsCount) => ({
  type: PRODUCTS_SUCCESS,
  payload: { data, productsCount },
});
export const productsError = () => ({
  type: PRODUCTS_ERROR,
  payload: {},
});

function createUrl(url, { _page, _limit, _sort, _order, q, brand, feature }) {
  url = `${url}?_page=${_page}&_limit=${_limit}`;

  if (_order && _sort) {
    url += `&_sort=${_sort}&_order=${_order}`;
  }
  if (q) {
    url += `&q=${q}`;
  }
  if (brand && feature) {
    url += `&brand=${brand}&feature=${feature}`;
  }
  if (brand) {
    url += `&brand=${brand}`;
  }
  if (feature) {
    url += `&feature=${feature}`;
  }
  return url;
}

export const fetchProducts = (obj) => (dispatch) => {
  let api = createUrl("http://localhost:3001/products", obj);
  console.log(
    "filterSortStateObj inside fetchdata function",
    obj,
    "api->",
    api
  );
  dispatch(productsLoading());
  axios(api)
    .then((res) => {
      console.log("res after fetch", res);
      dispatch(productsSuccess(res.data, +res.headers["x-total-count"]));
    })
    .catch((err) => {
      console.log("error in fetch-", err);
      dispatch(productsError());
    });
};
