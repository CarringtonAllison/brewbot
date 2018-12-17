import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Google from "../Google/SearchBox"
import FavCard from "../favoriteCard"
import './index.css'
import API from "../../utils/API"

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            errors: {},
            favoriteBeers: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("usertoken");
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        }, this.getFave)

    }

    getFave() {
        console.log(this.state.email);
        API.getFavBeers(this.state.email)
            .then(data =>
                this.setState({
                    favoriteBeers: data.data[0].favorites
                },
                    () => console.log(this.state.favoriteBeers)
                )
            )
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col centerUp">
                        <h1 className="welcome">Welcome, {this.state.first_name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div id="googleMap" className="col-12 col-lg-7">
                        <Google />
                    </div>
                    <div id="favoriteBrews" className="col-12 col-lg-5">
                        <div className="table">
                            <h1 id="favBeers" className="text-center">Favorite Brews</h1>
                            <table className="text-center">
                                <tbody>
                                    <tr>
                                        <th>Beer Name</th>
                                        <th>ABV</th>
                                    </tr>

                                    {this.state.favoriteBeers ? this.state.favoriteBeers.map((item, i) => <FavCard key={i} {...item} />) : {}}

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