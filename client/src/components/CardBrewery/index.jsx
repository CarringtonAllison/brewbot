import React from "react";
// import Button from "../Button"

function JumboTron(props) {
    return (
        <div className="col center">
            <img className="imgLoad"
                src={props.URL}
                alt="Beer" />
            <div>
                {
                    ( /*Ternary start */
                        props.name ?
                            ( /*Check is true then do this */
                                <div className="card-body">
                                    <h5 className="card-title">{props.name}</h5>
                                    <p className="card-text">{props.description}</p>
                                    <a className="card-text" href={props.website} target="_blank">Website</a>
                                </div>
                            ) /*End*/
                            :
                            ( /* check is false do this */
                                null
                            ) /*End*/
                    )/*Ternary End */
                }
            </div>
        </div>
    )
}

export default JumboTron;