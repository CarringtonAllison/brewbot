const api = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

api.get("/getBeers/:searchType/:searchTerm", (req, res) => {
    var searchType = req.params.searchType;
    var searchTerm = req.params.searchTerm;
    console.log("im here")

    var URL = "https://api.brewerydb.com/v2/" + searchType + "/?key=" + process.env.API_KEY + "&name=" + searchTerm;

    axios.get(URL)
        .then(response => res.send(response.data))
        .catch(err => { console.log(err) });

});

api.get("/articles", function(req, res){
    axios.get("https://www.craftbeer.com/category/news").then(function(response) {
    
        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);
      
        var arr = []
      
        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("article").each(function(i, element) {
      
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
  
} )

module.exports = api;