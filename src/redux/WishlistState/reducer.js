import { GET_ALL_WISHLIST_PROD_SUCCESS, WISHLIST_ADDING_ERROR, WISHLIST_ADDING_LOADING, WISHLIST_ADDING_SUCCESS } from "./actionTypes";

const WishlistReducer=(state={
    loading:false,
    wishlisted:false,
    error:false,
    wishlistedProduct:{}
},{type,payload})=>{
    switch (type) {
        case WISHLIST_ADDING_LOADING:
            return{loading:true,wishlisted:false,error:false}
        case WISHLIST_ADDING_SUCCESS:
            return{loading:false,wishlisted:true,error:false,wishlistedProduct:payload}
        case WISHLIST_ADDING_ERROR:
            return{loading:false,wishlisted:false,error:true}
        default:
            return state
    }
}

const WishlistGetAllProductReducer=(state={
    wishlistProducts:[]
},{type,payload})=>{
    switch (type) {
        case GET_ALL_WISHLIST_PROD_SUCCESS:
            return{wishlistProducts:payload}
        default:
            return state
    }
}

export {WishlistReducer,WishlistGetAllProductReducer}