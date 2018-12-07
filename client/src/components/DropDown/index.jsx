import React from 'react';

export default function DropDown() {
    return (
        <div className="form-group">
            <select className="form-control form-control-lg" id="beerOrBrewery">
                <option>Beer</option>
                <option>Brewery</option>
            </select>
        </div>
    )
}