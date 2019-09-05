import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import CustomInput from './Customimput';

class SignUp extends Component {

    onSubmit(formData) {
        console.log('onSubmit')
        console.log('formData', formData)
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-lg-4 text-center">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
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
                                    name="name"
                                    type="text"
                                    id="name"
                                    label="Name:"
                                    placeholder="ex. Adam"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <Field
                                    name="surname"
                                    type="text"
                                    id="surname"
                                    label="Surname:"
                                    placeholder="ex. Smith"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <label> Gender</label>
                                <select class="form-control">
                                    <option>Female</option>
                                    <option>Male</option>
                                    <option>Other</option>
                                </select>
                            </fieldset>
                            <fieldset>
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    label="Enter your password"
                                    placeholder="yoursuperpassword"
                                    component={CustomInput} />

                            </fieldset>
                            <fieldset>
                                <Field
                                    name="country"
                                    type="text"
                                    id="country"
                                    label="Country:"
                                    placeholder="ex. Poland"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <Field
                                    name="city"
                                    type="text"
                                    id="city"
                                    label="City:"
                                    placeholder="ex. Katowice"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <Field
                                    name="bio"
                                    type="text"
                                    id="bio"
                                    label="Bio:"
                                    placeholder="ex. I like to swim"
                                    component={CustomInput} />
                            </fieldset>
                            <div class="col-md text-center">
                                <button type="submit" className="btn-lg btn-primary">
                                    Sign Up!
                        </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-6 col-lg-4 text-center" >
                        <div className="text-center" style={{ padding: "50px" }}>
                            <div className="alert alert-primary">
                                <h3>Or sign up using Social Media Services!</h3>
                            </div>
                            <button className="btn-lg btn-primary" style={{ padding: "15px" }} style={{ margin: "10px" }}>Facebook</button>
                            <button className="btn-lg btn-primary" style={{ padding: "15px" }} style={{ margin: "10px" }}>Google</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({ form: 'signup' })(SignUp)
