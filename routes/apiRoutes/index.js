const api = require("express").Router();
const axios = require("axios");

api.get("/api/getBeers/:searchType/:searchTerm", (req, res) => {
    var searchType = req.params.searchType;
    var searchTerm = req.params.searchTerm;
    console.log("im here")

    var URL = "https://cors-escape.herokuapp.com/https://api.brewerydb.com/v2/" + searchType + "/?key=091aef518454c817284027220f913f6c&name=" + searchTerm;

    axios.get(URL).then(data => res.json(data)).catch(err => res.json(err));

});

module.exports = api;