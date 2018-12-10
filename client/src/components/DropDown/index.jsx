import React from 'react';

export default function DropDown(props) {
    return (
        <div className="form-group">
            <select className="form-control form-control-lg" id="beerOrBrewery" name="searchOption" {...props}>
                <option value="beers">Beer</option>
                <option value="breweries">Brewery</option>
            </select>
        </div>
    )
}