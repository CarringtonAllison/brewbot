import React, { Component } from 'react';
import "./index.css"


export default class Footer extends Component {
    render() {
        return (
            <nav className="navbar footer">
                <div className="container justify-content-center">
                    <div className="row">
                        <div className="col">
                            <p id="name">BrewBot™</p>
                        </div>
                        <div className="col">
                            <a href="https://github.com/CarringtonAllison/brewbot" target="_blank"><i className="fab fa-github icon"></i></a>
                        </div>
                        <div className="col">
                            <a href="https://github.com/CarringtonAllison/brewbot" target="_blank"><i className="icon iconx fab fa-instagram"></i></a>
                        </div>
                        <div className="col">
                            <a href="https://github.com/CarringtonAllison/brewbot" target="_blank"><i class="icon fab fa-facebook"></i></a>
                        </div>
                        <div className="col">
                            <a href="https://www.youtube.com/watch?v=Sx14RYPqYvo" target="_blank"><i class="icon iconx fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
} 