import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import PrivateRoute from './components/Private';
import Home from './components/Home';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import reducers from './reducers/index'
import Resetpassword from './components/Resetpassword';
import Resetpassword2 from './components/Resetpassword2';
import Logged from './components/Logged';




export default class App extends React.Component {

    State = {
        isLoggedIn: false
    }

    render() {

        return (
            <div>
                <Header />
                <Provider store={createStore(reducers, {})}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/signin" component={SignIn} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <Route path="/resetpassword" component={Resetpassword} />
                        <Route path="/resetpassword2" component={Resetpassword2} />
                        <Route path="/logged" component={Logged} />
                    </Switch>
                </Provider>,
        </div >
        )

    }
}