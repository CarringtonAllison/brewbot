import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            errors: {}
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("usertoken");
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        })
    }

    render() {
        return (

            <div className="row">
                <div className="jumbotron col-lg-12 mt-5">
                    <div className="mx-auto">
                        <h1 className="text-center">Profile</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.first_name}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.last_name}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default Profile