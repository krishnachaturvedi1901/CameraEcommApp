import { HANDLE_FILTER_BY_BRAND, HANDLE_FILTER_BY_FEATURE, UPDATE_FILTERATION_STATE, UPDATE_PAGINATION_STATE, UPDATE_SEARCHING_STATE, UPDATE_SORTING_STATE } from "./actionTypes";

export const updatePaginationState=(data)=>{
    console.log("inside updatePaginationStateFunction-***********>",data)
    return {
    type:UPDATE_PAGINATION_STATE,
    payload:data
}}

export const updateSortingState=(data)=>({
    type:UPDATE_SORTING_STATE,
    payload:data
})

export const updateSearchingState=(data)=>({
    type:UPDATE_SEARCHING_STATE,
    payload:data
})

export const handleFilterByBrand=(data)=>{
    console.log("))))))))))))))))))-->",data)
    return {
    type:HANDLE_FILTER_BY_BRAND,
    payload:data
}}
export const handleFilterByFeature=(data)=>{
    console.log("))))))))))))))))))feature-->",data)
    return {
    type:HANDLE_FILTER_BY_FEATURE,
    payload:data
}}