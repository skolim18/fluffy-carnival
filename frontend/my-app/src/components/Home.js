import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const image = "https://cdn.shopify.com/s/files/1/1723/9103/products/Screen_Shot_2018-04-09_at_9.39.34_PM_1024x1024.png?v=1523328013";
        const {isAuthenticated, user} = this.props.auth;
        const authPage = (
            <div>
                Hello to Fluffy Carnival page!
            </div>
            
        )
      const guestPage = (
        <div className="container-fluid text-center">
        <div className="row">
            <div className="col-md-12">
                <img src={image} height="400"></img>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <Link  to="/register">Register</Link> or <Link  to="/login">login as existing user</Link> to access the Fluffy Carnival page!
            </div>
        </div>
        </div>
      )

        return(
            <div>
                <div>
                    {isAuthenticated ? authPage : guestPage}
                </div>
            </div>
        )
    }
}
Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Home));