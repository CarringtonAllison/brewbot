import React from 'react';
import './index.css'

const DropDown = (props) => {
    return (
        <div className="form-group">
            <select className="form-control form-control-lg" id="beerOrBrewery" name="searchOption" {...props}>
                <option value="beers">Beer</option>
                <option value="breweries">Breweries (coming soon)</option>
            </select>
        </div>
    )
}

export default DropDown; 