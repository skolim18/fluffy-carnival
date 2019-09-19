import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Axios from 'axios';

import CustomInput from './Customimput';

class ResetPassword2 extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        password: ""
    }

    onSubmit = () => {
        const userToken = this.props.location.search
        Axios.put(`http://localhost:9090/user/reset${userToken}`, {
            password: this.state.password
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
                    <div class="col-md-3 text-center">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                            <h1>Please enter your new password</h1>
                            <fieldset>
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    value={this.state.password}
                                    onChange={event => this.handleChange(event, "password")}
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