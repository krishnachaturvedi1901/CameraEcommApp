import { PRODUCTS_ERROR, PRODUCTS_LOADING, PRODUCTS_SUCCESS } from './actionTypes'

let initialState ={
    loading:true,
    products:[],
    totalProducts:0,
    error:false
}

const ProductReducer = (state=initialState,action) => {
if(action.type===PRODUCTS_LOADING){
    return state
}
else if(action.type===PRODUCTS_SUCCESS){
    return {
        ...state,
        loading:false,
        products:action.payload.data,
        totalProducts:action.payload.productsCount,
        error:false
    }
}
else if(action.type===PRODUCTS_ERROR){
    return {
        ...state,
        loading:false,
        products:[],
        error:true
    }
}
else return state
  
}

export default ProductReducer