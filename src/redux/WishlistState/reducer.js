import { GET_ALL_WISHLIST_PROD_SUCCESS, WISHLIST_ADDING_ERROR, WISHLIST_ADDING_LOADING, WISHLIST_ADDING_SUCCESS } from "./actionTypes";

const WishlistReducer=(state={
    loading:false,
    wishlisted:false,
    error:false,
    wishlist:[]
},{type,payload})=>{
    switch (type) {
        case WISHLIST_ADDING_LOADING:
            return{loading:true,wishlisted:false,error:false,wishlist:[]}
        case WISHLIST_ADDING_SUCCESS:
            return{loading:false,wishlisted:true,error:false,wishlist:[]}
        case WISHLIST_ADDING_ERROR:
            return{loading:false,wishlisted:false,error:true,wishlist:[]}
        case GET_ALL_WISHLIST_PROD_SUCCESS:
            return{loading:false,wishlisted:false,error:false,wishlist:payload}
        default:
            return state
    }
}

export {WishlistReducer}