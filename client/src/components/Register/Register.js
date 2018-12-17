import React, { Component } from 'react'
import { register } from '../Userfunctions/Userfunction'
import "../Login/login.css";

class Register extends Component {
    constructor() {
        super()
        this.state = {

            first_name: '',
            last_name: '',
            email: '',
            password: '',
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

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        register(newUser).then(res => {
            this.props.history.push('/login')
        })
    }
    render() {
        return (
            <div className="row justify-content-center center">
                <div className="col col-lg-8 login">
                    <form className="formWork" noValidate onSubmit={this.onSubmit}>
                        <h1 id="registerSign" className="h3 mb-3 font-weight-normal">Register</h1>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control center"
                                name="first_name"
                                placeholder="First Name"
                                value={this.state.first_name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control center"
                                name="last_name"
                                placeholder="Last Name"
                                value={this.state.last_name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control center"
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
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg buttonStyle">
                            Register!
                            </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register