import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import registerServiceWorker from './serviceWorker'
import App from './App';




ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ,
    document.querySelector('#root'))


