const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema 
const BeerSchema = new Schema({
    name: {
        type: String
    },
    abv: {
        type: String
    },
    descript: {
        type: String,
    }
})


module.exports = Beer = mongoose.model('beers', BeerSchema)
