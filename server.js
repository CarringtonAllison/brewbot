require("dotenv").config();
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require("morgan");
var app = express();
const mongoose = require('mongoose');

var port = process.env.PORT || 3001

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

const mongoURI = 'mongodb://localhost:27017/brewbotdb'

mongoose
.connect(
    mongoURI,
    {useNewUrlParser: true}
)
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

<<<<<<< HEAD
var Users = require('./routes/Users')
var Scraper = require('./routes/Scraping')
app.use('/users', Users);
app.use('/', Scraper)
=======
app.use(require("./routes"));
>>>>>>> 1693f8c57313f3e978056d497ca060f5dd44efed

app.listen(port, function() {
    console.log('server is running on port:' + port)
});