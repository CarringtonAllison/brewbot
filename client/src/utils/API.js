const Axios = require("axios");

const API = {
    getbeer: function (search, name) {
        return Axios.get("/api/getBeers/" + search + "/" + name);
    },

    getArticles: function(){
        return Axios.get("/api/articles");
    }
}

module.exports = API;