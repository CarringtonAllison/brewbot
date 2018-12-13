const Axios = require("axios");

const API = {
    getbeer: function (search, name) {
        return Axios.get("/api/getBeers/" + search + "/" + name);
    },

    getArticles: function(){
        return Axios.get("/api/articles");
    },

    getBeerDB: function(searchKey){
        return Axios.get("/api/beersDB/" + searchKey);
    },
    addFavorites: function(body){
        return Axios.post("/api/postFavorite", body);
    }
}

module.exports = API;