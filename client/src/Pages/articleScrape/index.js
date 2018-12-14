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
            <div>
                
                    {
                        this.state.results.data ? <div>{this.state.results.data.map((result) =>

                            
                            <ul>
                            <li>
                                <a href={result.link}>{result.title}</a>
                                </li>
                            <li>
                                <img className="articleImg" src={result.image}>
                                </img>
                            </li>
                            </ul>
                            )}
                        </div> : <div>didnt work</div>
                    }
                    
                

            </div>

            
        )
    }
}

export default Scrape;


