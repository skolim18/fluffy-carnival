import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import registerServiceWorker from './serviceWorker'
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import reducers from './reducers'
import Resetpassword from './components/Resetpassword';
import Resetpassword2 from './components/Resetpassword2';

ReactDOM.render(
    <Provider store={createStore(reducers, {})}>
        <BrowserRouter>
            <App>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/resetpassword" component={Resetpassword} />
                <Route exact path="/resetpassword2" component={Resetpassword2} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'))


