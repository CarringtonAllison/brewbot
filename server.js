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

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/brewbotdb';

mongoose
.connect(
    mongoURI,
    {useNewUrlParser: true}
)
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

app.use(require("./routes"));

app.listen(port, function() {
    console.log('server is running on port:' + port)
});