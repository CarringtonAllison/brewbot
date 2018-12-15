import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Google from "../Google/SearchBox"
import './index.css'
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
            <div>
                <div className="row">
                    <h1 className="welcome">Welcome, {this.state.first_name}</h1>
                </div>
                <div className="row">
                    <div className="col-7">
                        <Google />
                    </div>
                    <div className="col-5">
                        <div className="table">
                            <h1 id="favBeers" className="text-center">Favorite Brews</h1>
                            <table className="text-center">
                                <tbody>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                    </tr>
                                    <tr>
                                        <td>{this.state.first_name}</td>
                                        <td>{this.state.last_name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

export default Profile