import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Provider} from "react-redux";
import store from './store/store'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import SingleProduct from "./pages/single-product";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path={'/'} element={<App/>}/>
                <Route path={'/product/:id'} element={<SingleProduct/>}/>
            </Routes>
        </Provider>
    </BrowserRouter>
);
