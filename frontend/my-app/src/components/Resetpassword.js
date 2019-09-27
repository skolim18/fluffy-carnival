import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Axios from 'axios';

import CustomInput from './Customimput';

class ResetPassword extends Component {

    state = {
        email: ""
    }

    onSubmit = () => {
        Axios.post('http://localhost:9090/user/reset', {
            email: this.state.email
        })
            .then(data => {
                console.log(data)
            });
    }

    handleChange = (event, fillName) => {
        this.setState({ [fillName]: event.target.value });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="col-md-3 text-center">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                            <h1>Please enter your email</h1>
                            <fieldset>
                                <Field
                                    name="email"
                                    type="text"
                                    id="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={event => this.handleChange(event, "email")}
                                    component={CustomInput} />

                            </fieldset>
                            <button type='submit' className="btn btn-primary">
                                Send email!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default reduxForm({ form: 'resetpassword' })(ResetPassword)

