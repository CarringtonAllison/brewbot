import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import "./nav.css"

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
                        My Brewery
                    </Link>

                </li>
                <li className="navitem">
                    <Link to="/searchPage" className="nav-link">Find Beers</Link>
                </li>
                <li className="navitem">
                    <Link to="/articles" className="nav-link">News</Link>
                </li>
                <li className="navitem">
                    <a href="/login" onClick={this.logOut.bind(this)} className="nav-link">Logout</a>
                </li>

            </ul>
        )

        return (
            <div className="navbar-expand-lg d-flex justify-content-center ">
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

                <div className="collapse  navbar-collapse justify-content-between" id="navbarsExample10">
                    <h3 id="title">Brew Bot</h3>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </div>
        )
    }
}

export default withRouter(Landing)