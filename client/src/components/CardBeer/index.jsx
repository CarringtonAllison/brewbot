import React from "react";
import Button from "../Button"
import './index.css'

function JumboTron(props) {
    return (
        <div className="col center">
            <img className="imgLoad"
                src={props.image}
                alt="Beer" />
            <div>
                {
                    ( /*Ternary start */
                        props.name ?
                            ( /*Check is true then do this */
                                <div className="card-body">
                                    <h5 className="card-title">{props.name}</h5>
                                    <p className="card-text">{props.description}</p>
                                    <p className="card-text">ABV: {props.abv}</p>
                                    <Button onClick={props.onClick}>Save To Favorites</Button>
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