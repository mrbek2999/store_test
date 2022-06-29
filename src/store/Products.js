import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "./apiAction";

const slice = createSlice({
    name: 'product',
    initialState: {products: [], single_product: {}, filteringProducts: [], count: 0},
    reducers:{
        getAllProduct: (state,action)=>{
            state.products = action.payload.products
            state.count = action.payload.count
        },
        getOneProduct: (state,action)=>{
            state.single_product = action.payload
        },
        getFilteringProduct: (state,action)=>{
            state.filteringProducts = action.payload.products
            state.count = action.payload.count
        },
    }
})

export const getProducts = (obj) => apiCall({
    url: 'product?'+obj,
    method: 'GET',
    onSuccess: slice.actions.getAllProduct.type
})

export const getProduct = (id) => apiCall({
    url: 'product/'+id,
    method: 'GET',
    onSuccess: slice.actions.getOneProduct.type
})

export const getFilteringProducts = (data) => apiCall({
    url: 'product?'+data,
    method: 'GET',
    onSuccess: slice.actions.getFilteringProduct.type
})

export default slice.reducer