import React from "react";

function FavCard(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.abv}</td>
        </tr>
    )
}

export default FavCard;