import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Axios from "axios";
import CustomInput from './Customimput';



class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    onSubmit = (formData) => {
        Axios.post('http://localhost:9090/user/authenticate', {
            email: this.state.email,
            password: this.state.password
        })
            .then(data => {
                console.log(data);

            });
    }

    handleChange = (event, fillName) => {
        this.setState({ [fillName]: event.target.value });
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-3 text-center">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                            <h1>Sign In</h1>
                            <fieldset>
                                <Field
                                    name="email"
                                    type="text"
                                    id="email"
                                    label="Enter your email"
                                    value={this.state.email}
                                    onChange={event => this.handleChange(event, "email")}
                                    placeholder="example@example.com"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    label="Enter your password"
                                    value={this.state.password}
                                    onChange={event => this.handleChange(event, "password")}
                                    placeholder="yoursuperpassword"
                                    component={CustomInput} />
                            </fieldset>
                            <div className='col-md text-center'>
                                <button type="sumbit" className="btn btn-primary">
                                    Sign In!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default reduxForm({ form: 'signin' })(SignIn)
