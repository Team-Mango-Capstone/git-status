import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Popper from '@popperjs/core';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';


// Set default header for axios requests so that the oAuth access token will be included on all requests
axios.defaults.headers.common[
  "Authorization"
] = `token ${localStorage.getItem("oAuthAccessToken")}`;


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
