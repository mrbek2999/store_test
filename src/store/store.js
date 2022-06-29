import {configureStore} from '@reduxjs/toolkit'
import product from './Products'
import category from "./category";
import {api} from "./middleware/api";

export default configureStore({
    reducer: {
        product, category
    },
    middleware: [
        api,
    ]
})