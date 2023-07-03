import { ADD_TO_CART_ERROR, ADD_TO_CART_LOADING, ADD_TO_CART_SUCCESS, GET_ALL_CART_PRODUCTS_ERROR, GET_ALL_CART_PRODUCTS_LOADING, GET_ALL_CART_PRODUCTS_SUCCESS } from "./actionTypes";

const AddToCartReducer=(state={cartLoading:false,cartAdded:false,cartError:false},{type,payload})=>{
    switch (type) {
        case ADD_TO_CART_LOADING:
            return {...state,cartLoading:true,cartAdded:false}
        case ADD_TO_CART_SUCCESS:
            return {...state,cartLoading:false,cartAdded:true}
        case ADD_TO_CART_ERROR:
            return {...state,cartLoading:false,cartAdded:false,cartError:true}
        default:
            return state
            
    }
}
const GetAllCartProductReducer=(state={getAllCartLoading:false,getAllCartSuccess:[],getAllCartError:false},{type,payload})=>{
    switch (type) {
        case GET_ALL_CART_PRODUCTS_LOADING:
            return {...state,getAllCartLoading:true}
        case GET_ALL_CART_PRODUCTS_SUCCESS:
            return {...state,getAllCartLoading:false,getAllCartSuccess:payload}
        case GET_ALL_CART_PRODUCTS_ERROR:
            return {...state,getAllCartLoading:false,getAllCartSuccess:[],getAllCartError:true}
        default: 
            return state
    }
}

export {AddToCartReducer,GetAllCartProductReducer}