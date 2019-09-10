import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import CustomInput from './Customimput';

class ResetPassword2 extends Component {

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
                            <h1>Please enter your new password</h1>
                            <fieldset>
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    placeholder="Your new password"
                                    component={CustomInput} />

                            </fieldset>
                            <button type='submit' className="btn btn-primary">
                                Set new password!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default reduxForm({ form: 'resetpassword2' })(ResetPassword2)