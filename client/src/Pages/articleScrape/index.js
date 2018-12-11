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


