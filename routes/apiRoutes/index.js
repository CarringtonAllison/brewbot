const api = require("express").Router();
const axios = require("axios");

api.get("/getBeers/:searchType/:searchTerm", (req, res) => {
    var searchType = req.params.searchType;
    var searchTerm = req.params.searchTerm;
    console.log("im here")

    var URL = "https://api.brewerydb.com/v2/" + searchType + "/?key=" + process.env.API_KEY + "&name=" + searchTerm;

    axios.get(URL)
        .then(response => res.send(response.data))
        .catch(err => { console.log(err) });

});

module.exports = api;