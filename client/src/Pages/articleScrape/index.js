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
//     <div class="card" style="width: 18rem;">
//   <img class="card-img-top" src={result.image} alt="Card image cap">
//   <div class="card-body">
//     <p class="card-text">{result.title}</p>
//     <a href={result.link} class="btn btn-primary">Check it out!</a>
//   </div>
// </div>

    render() {
        return (
            <div className="row flex">
                
                    {
                        this.state.results.data ? <div>{this.state.results.data.map((result) =>

                            
                            <div className="card">
                            <img className="card-img-top articleImg" src={result.image} alt="Card image cap"/>
                            <div className="card-body">
                            <h3>{result.author}</h3>
                              <p className="card-text">{result.title}</p>
                              <a href={result.link} className="btn btn-primary">Check it out!</a>
                            </div>
                          </div>
                            )}
                        </div> : <div>didnt work</div>
                    }
                    
                

            </div>

            
        )
    }
}

export default Scrape;


