import React, { Component } from 'react'
import { login } from '../Userfunctions/Userfunction'
import "./login.css"
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            incorrectCred: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password,
            incorrectCred: this.state.incorrectCred
        }

        login(user).then(res => {
            console.log("here " + JSON.stringify(res))
            if (res.error) {
                this.setState({ incorrectCred: "incorrect login credentials... please try again!" })


            }
            else {
                this.props.history.push('/profile')
            }
        })
    }

    render() {
        return (
            <div className="row justify-content-center center">
                <div className="col col-lg-8 login">
                    <form className="formWork" noValidate onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal" id="sign">Please Sign In</h1>
                        <div className="form-group">
                            <div
                                onChange={this.onChange}>{this.state.incorrectCred}</div>
                            <input
                                type="email"
                                className="form-control center"
                                id="form"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control center"
                                id="form"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg buttonStyle">
                            Sign in
                            </button>
                    </form>
                </div>
            </div>
        )
    }

}

export default Login