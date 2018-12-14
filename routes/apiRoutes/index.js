const api = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../../models/index");
const Beer = db.Beer;
const User = db.User;


api.get("/getBeers/:searchType/:searchTerm", (req, res) => {
    var searchType = req.params.searchType;
    var searchTerm = req.params.searchTerm;
    console.log("im here")

    var URL = "https://api.brewerydb.com/v2/" + searchType + "/?key=" + process.env.API_KEY + "&name=" + searchTerm;

    axios.get(URL)
        .then(response => res.send(response.data))
        .catch(err => { console.log(err) });

});
api.get("/beersDB/:name", (req, res) => {
    var options = {}

    if (req.params.name) {
        options.name = req.params.name;
    }

    Beer.find(options, (err, docs) => {
        if (err) {
            console.log(err);
        }

        res.send(docs);
    })
});

api.put("/postFavorite", (req, res) => {
    console.log(req.body);
    var userEmail = req.body.email;
    var obj = {
        name: req.body.name,
        abv: req.body.abv,
        description: req.body.description
    }
    User.findOneAndUpdate({ email: userEmail },
        { $push: { favorites: obj } },
        (err, response) => {
            res.send(response);
        });
});

api.get("/getFav/:email", (req, res) => {
    var userEmail = req.params.email;

    User.find({email: userEmail}, (err, response)=>{
        res.send(response);
    })
})

api.post("/addBeers", (req, res) => {
    var obj = {
        name: req.body.name,
        abv: req.body.abv,
        descript: req.body.description
    }

    Beer.create(obj).then(beer => res.send(beer)).catch(err => console.log(err));
})

api.get("/articles", function (req, res) {
    axios.get("https://www.craftbeer.com/category/news").then(function (response) {

        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

        var arr = []

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("article").each(function (i, element) {

            // Save the text of the element in a "title" variable
            var title = $(element).children("header").children("h2.entry-title").text().trim();

            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            var link = $(element).children("header").children("h2.entry-title").children().attr("href");

            var image = $(element).children("figure.post-thumbnail").children("a").children("img").attr("src");

            var json = {
                title: title,
                link: link,
                image: image
            }
            console.log(json);
            arr.push(json)

        });

        // Log the results once you've looped through each of the elements found with cheerio
        res.json(arr)

    });

})

module.exports = api;