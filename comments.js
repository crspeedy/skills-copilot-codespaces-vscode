//create web server
// 1. load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// 2. create instance of express
var app = express();

// 3. set up middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// 4. connect to the database
mongoose.connect('mongodb://localhost/myDB');

// 5. define model
var Comment = mongoose.model('Comment', {
    username: String,
    comment: String
});

// 6. define routes
// GET /comments
app.get('/comments', function(req, res) {
    Comment.find(function(err, comments) {
        res.json(comments);
    });
});

// POST /comments
app.post('/comments', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        res.json(comment);
    });
});

// 7. start server
app.listen(3000);
console.log('Server running at http://localhost:3000/');

