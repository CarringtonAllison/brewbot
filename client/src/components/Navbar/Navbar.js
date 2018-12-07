import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'


class Landing extends Component {
    logOut(e) {
        console.log("get me out of here!")
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="navitem">
                    <Link to="/login" className="nav-link">
                        Login
            </Link>
                </li>
                <li className="navitem">
                    <Link to="/register" className="nav-link">
                        Register
            </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="navitem">
                    <Link to="/profile" className="nav-link">
                        User
        </Link>
                </li>
                <li className="navitem">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">Logout</a>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample10"
                    aria-controls="navbarsExample10"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    </span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }

}

export default withRouter(Landing)