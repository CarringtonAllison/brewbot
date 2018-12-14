import React from "react";
import Button from "../Button"

function JumboTron(props) {
    return (
        <div className="card">
            <img className="card-img-top"
                src={props.image}
                alt="" />
            <div className="card-body">
                {
                    ( /*Ternary start */
                        props.name ?
                            ( /*Check is true then do this */
                                <div>
                                    <h5 className="card-title">{props.name}</h5>
                                    <p className="card-text">{props.description}</p>
                                    <p className="card-text">ABV: {props.abv}</p>
                                    <Button type="success" onClick={props.onClick}>Save</Button>
                                </div>
                            ) /*End*/
                            :
                            ( /* check is false do this */
                                <div>
                                    <h5 className="card-title">Please Search For a Beer/Brewery</h5>
                                </div>
                            ) /*End*/
                    )/*Ternary End */
                }
            </div>
        </div>
    )
}

export default JumboTron;