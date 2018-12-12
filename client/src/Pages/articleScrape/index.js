import React, { Component } from 'react'
import API from "../../utils/API"
import jwt_decode from 'jwt-decode'

class Scrape extends Component {
    state = {
        results: "",
        first_name: '',
        last_name: '',
        email: '',
        errors: {}
    }

    scrapeArticles() {

        API.getArticles().then(response => {
            this.setState({ results: response })
        })
    }

    componentDidMount() {
        this.scrapeArticles();
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
                <ul>
                    {
                        this.state.results.data ? <div>{this.state.results.data.map((result) =>
                            <li>
                                <a href={result.link}>{result.title}</a>
                                <img src={result.image}>
                                </img>
                            </li>)}
                        </div> : <div>didnt work</div>
                    }

                </ul>

            </div>
        )
    }
}

export default Scrape;


