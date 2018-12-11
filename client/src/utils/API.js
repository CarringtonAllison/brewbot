const Axios = require("axios");

const API = {
    getbeer: function (search, name) {
        // return Axios.get("/api/getBeers/searchType=" + search + "/searchTerm=" + name);
        var URL = "https://cors-escape.herokuapp.com/https://api.brewerydb.com/v2/" + search + "/?key=091aef518454c817284027220f913f6c&name=" + name;
        return Axios.get(URL);
    }
}


module.exports = API;