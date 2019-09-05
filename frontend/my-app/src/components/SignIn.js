import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import CustomInput from './Customimput';

class SignIn extends Component {

    onSubmit(formData) {
        console.log('onSubmit')
        console.log('formData', formData)
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div class="col-md-3 text-center">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                            <h1>Sign In</h1>
                            <fieldset>
                                <Field
                                    name="email"
                                    type="text"
                                    id="email"
                                    label="Enter your email"
                                    placeholder="example@example.com"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <Field
                                    name="password"
                                    type="text"
                                    id="password"
                                    label="Enter your password"
                                    placeholder="yoursuperpassword"
                                    component={CustomInput} />
                            </fieldset>
                            <div class='col-md text-center'>
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
