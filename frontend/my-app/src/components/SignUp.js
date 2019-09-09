import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Axios from 'axios';

import CustomInput from './Customimput';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        surname: '',
        gender: 'Other',
        country: '',
        city: '',
        bio: '',
        birthDate: '12-05-1999'
    }


    onSubmit = (formData) => {
        Axios.post('http://localhost:9090/user/register', {
            email: this.state.email,
            name: this.state.name,
            surname: this.state.surname,
            gender: this.state.gender,
            password: this.state.password,
            country: this.state.country,
            city: this.state.city,
            bio: this.state.bio,
            birthDate: this.state.birthDate
        })
            .then(data => {
                console.log(data, "jejej");
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
                    <div className="col-sm-6 col-lg-4 text-center">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
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
                                    name="name"
                                    type="text"
                                    id="name"
                                    label="Name:"
                                    value={this.state.name}
                                    onChange={event => this.handleChange(event, "name")}
                                    placeholder="ex. Adam"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <Field
                                    name="surname"
                                    type="text"
                                    id="surname"
                                    label="Surname:"
                                    value={this.state.surname}
                                    onChange={event => this.handleChange(event, "surname")}
                                    placeholder="ex. Smith"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <label> Gender</label>
                                <select className="form-control"
                                    onChange={event => this.handleChange(event, "gender")}
                                    defaultValue={this.state.gender}>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select>
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
                            <fieldset>
                                <Field
                                    name="country"
                                    type="text"
                                    id="country"
                                    label="Country:"
                                    value={this.state.country}
                                    onChange={event => this.handleChange(event, "country")}
                                    placeholder="ex. Poland"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <Field
                                    name="city"
                                    type="text"
                                    id="city"
                                    label="City:"
                                    value={this.state.city}
                                    onChange={event => this.handleChange(event, "city")}
                                    placeholder="ex. Katowice"
                                    component={CustomInput} />
                            </fieldset>
                            <fieldset>
                                <Field
                                    name="bio"
                                    type="text"
                                    id="bio"
                                    label="Bio:"
                                    value={this.state.bio}
                                    onChange={event => this.handleChange(event, "bio")}
                                    placeholder="ex. I like to swim"
                                    component={CustomInput} />
                            </fieldset>
                            <div className="col-md text-center">
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
