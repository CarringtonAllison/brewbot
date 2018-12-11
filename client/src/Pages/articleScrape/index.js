import React, { Component } from 'react'
import API from "../../utils/API"

class Scrape extends Component {
    state = {
        results: "",
    }

    scrapeArticles() {

        API.getArticles().then(response => {
            this.setState({ results: response })
        })
    }

    componentDidMount() {
        this.scrapeArticles();
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.results.data ? <div>{this.state.results.data.map((result) => <li>{result.title}{result.link}<img src={result.image}></img></li>)}</div> : <div>didnt work</div>
                    }

                </ul>


                <h1>is this working?</h1>

            </div>
        )
    }
}

export default Scrape;


