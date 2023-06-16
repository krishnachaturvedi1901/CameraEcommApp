import { legacy_createStore , combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ProductReducer from "./productPageState/reducer";
import { filteringReducer, paginationReducer, searchingReducer, sortingReducer } from "./pageSortFilterState/reducer";

const rootReducer=combineReducers({
  ProductState:ProductReducer,
  PaginationState:paginationReducer,
  SortingState:sortingReducer,
  SearchingState:searchingReducer,
  FilteringState:filteringReducer
})
const middlewares=applyMiddleware(thunk)

export const store = legacy_createStore(rootReducer,middlewares)

store.subscribe(()=>{
  console.log("Updated State-",store.getState())    
})