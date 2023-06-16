import {
  HANDLE_FILTER_BY_BRAND,
  HANDLE_FILTER_BY_FEATURE,
  UPDATE_PAGINATION_STATE,
  UPDATE_SEARCHING_STATE,
  UPDATE_SORTING_STATE,
} from "./actionTypes";

const filteringReducer = (state = { brand: null,feature:null }, { type, payload }) => {
  switch (type) {
    case HANDLE_FILTER_BY_BRAND:
      return { ...state, brand: payload };
    case HANDLE_FILTER_BY_FEATURE:
      return { ...state, feature: payload };

    default:
      return state;
  }
};

const sortingReducer = (
  state = { _sort: null, _order: null },
  { type, payload }
) => {
  switch (type) {
    case UPDATE_SORTING_STATE:
      return { ...state, _sort: payload.sortBy, _order: payload.orderType };
    default:
      return state;
  }
};

const searchingReducer = (state = { q: null }, { type, payload }) => {
  switch (type) {
    case UPDATE_SEARCHING_STATE:
      return { ...state, q: payload.querySearch };

    default:
      return state;
  }
};

const paginationReducer = (
  state = { _page: 1, _limit: 10 },
  { type, payload }
) => {
  switch (type) {
    case UPDATE_PAGINATION_STATE:
      return { ...state, _page: payload.pageCount, _limit: payload.perPage };
    default:
      return state;
  }
};

export {
  paginationReducer,
  sortingReducer,
  searchingReducer,
  filteringReducer,
};
