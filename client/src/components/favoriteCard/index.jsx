import React from "react";

function FavCard(props) {
    console.log(props);
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.description}</p>
                <p className="card-text">{props.abv}</p>
            </div>
        </div>
    )
}

export default FavCard;