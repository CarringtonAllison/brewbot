require("dotenv").config();
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require("morgan");
var app = express();
const mongoose = require('mongoose');
const path = require("path")

var port = process.env.PORT || 3001

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(express.static(path.join(__dirname, "client", "build")))

const mongoURI = process.env.MONGODB_URI || 'mongodb://amuscara:password1@ds139334.mlab.com:39334/heroku_fs2lj7gr';

mongoose
.connect(
    mongoURI,
    {useNewUrlParser: true}
)
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

app.use(require("./routes"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, function() {
    console.log('server is running on port:' + port)
});