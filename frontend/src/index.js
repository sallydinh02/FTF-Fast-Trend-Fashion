import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./store";

import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './sass/index.scss'
import ShopContextProvider from './Context/ShopContext';

import Layout from './components/Layout'

ReactDOM.render(
  <React.StrictMode>
    <ShopContextProvider>
      <Provider store={store}>
        <Layout />
      </Provider>
    </ShopContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
