import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import CustomInput from './Customimput';

class ResetPassword extends Component {

    onSubmit(formData) {
        console.log('formData', formData)
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div class="col-md-3 text-center">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                            <h1>Please enter your email</h1>
                            <fieldset>
                                <Field
                                    name="email"
                                    type="text"
                                    id="email"
                                    placeholder="Email"
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

