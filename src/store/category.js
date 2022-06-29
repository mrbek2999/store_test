import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "./apiAction";

const slice = createSlice({
    name: 'category',
    initialState: {categories: []},
    reducers:{
        getAllCategory: (state,action)=>{
            state.categories = action.payload
        }
    }
})

export const getCategories = () => apiCall({
    url: 'category/',
    method: 'GET',
    onSuccess: slice.actions.getAllCategory.type
})

export default slice.reducer
