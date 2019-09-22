import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';

import Dashboard from './components/Dashboard';
import Resetpassword from './components/Resetpassword';
import Resetpassword2 from './components/Resetpassword2';
import Logged from './components/Logged';
import Useractivated from './components/UserActivated';
import UserCreated from './components/UserCreated';

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
  
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = '/login'
    }
  }

class App extends Component {
    render() {
      return (
        <Provider store = { store }>
          <Router>
              <div>
                <Header />
                  <Route exact path="/" component={ Home } />
                  <div className="container">
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/login" component={ Login } />
                  </div>
              </div>
            </Router>
          </Provider>
      );
    }
  }
  
  export default App;


// export default class App extends React.Component {

//     State = {
//         isLoggedIn: false
//     }

//     render() {

//         return (
//             <div>
//                 <Header />
//                 <Provider store = { store }>>
//                     <Switch>
//                         <Route exact path="/" component={Home} />
//                         <Route path="/register" component={ Register } />
//                         <Route path="/login" component={Login} />
//                         <PrivateRoute exact path="/dashboard" component={Dashboard} />
//                         <Route path="/resetpassword" component={Resetpassword} />
//                         <Route path="/resetpassword2" component={Resetpassword2} />
//                         <Route path="/logged" component={Logged} />
//                         <Route path="/useractivated" component={Useractivated} />
//                         <Route path="/usercreated" component={UserCreated} />
//                     </Switch>
//                 </Provider>
//         </div >
//         )

//     }
// }