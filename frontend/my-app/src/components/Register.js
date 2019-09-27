import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';

class Register extends Component {
    
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            surname: '',
            gender: 'other',
            country: '',
            city: '',
            birthDate: '',
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            name: this.state.name,
            surname: this.state.surname,
            gender: this.state.gender,
            password: this.state.password,
            country: this.state.country,
            city: this.state.city,
            birthDate: this.state.birthDate
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="email"
                    className={classnames('form-control form-control-lg')}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="name"
                    className={classnames('form-control form-control-lg')}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="surname"
                    className={classnames('form-control form-control-lg')}
                    name="surname"
                    onChange={ this.handleInputChange }
                    value={ this.state.surname }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="date"
                    placeholder="DD-MM-YYYY"
                    className={classnames('form-control form-control-lg')}
                    name="birthDate"
                    onChange={ this.handleInputChange }
                    value={ this.state.birthDate }
                    />
                </div>
                <div className="form-group">
                    <label> Gender*</label>
                                <select className="form-control"
                                    onChange={ this.handleInputChange }
                                    defaultValue={this.state.gender}>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg')}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Country"
                    className={classnames('form-control form-control-lg')}
                    name="country"
                    onChange={ this.handleInputChange }
                    value={ this.state.country }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="City"
                    className={classnames('form-control form-control-lg')}
                    name="city"
                    onChange={ this.handleInputChange }
                    value={ this.state.city }
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register));
