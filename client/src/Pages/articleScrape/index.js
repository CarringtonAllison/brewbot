import React, { Component } from 'react'
import API from "../../utils/API"
import "./index.css"

class Scrape extends Component {
    state = {
        results: "",
        errors: {}
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
            <div className="row padding justify-content-center">
                {
                    this.state.results.data ? this.state.results.data.map((result) =>
                        <div className="col-10 background">
                            <div className="inline">
                                <div className="align-items-center d-flex">
                                    <img className="articleImg" src={result.image} alt="Article Photo" />
                                </div>
                                <div className="card-body">
                                    <p className="card-text title">{result.title}</p>
                                    <p className="author">{result.author}</p>
                                    <a href={result.link} target="_blank" className="btn">Check it out!</a>
                                </div>
                            </div>
                        </div>
                    )
                        : null
                }



            </div>


        )
    }
}

export default Scrape;


