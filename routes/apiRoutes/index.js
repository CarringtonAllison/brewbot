const api = require("express").Router();
const axios = require("axios");

api.get("/getBeers/:searchType/:searchTerm", (req, res) => {
    var searchType = req.params.searchType;
    var searchTerm = req.params.searchTerm;
    console.log("im here")

    var URL = "https://api.brewerydb.com/v2/" + searchType + "/?key=091aef518454c817284027220f913f6c&name=" + searchTerm;

    axios.get(URL)
        .then(response => res.send(response.data))
        .catch(err => { console.log(err) });

});

module.exports = api;