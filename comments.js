// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express app
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comment by post id
app.post('/posts/:id/comments', (req, res) => {
  // Create random id
  const commentId = randomBytes(4).toString('hex');

  // Get comment content
  const { content } = req.body;

  // Get post id
  const postId = req.params.id;

  // Get comments by post id
  const comments = commentsByPostId[postId] || [];

  // Create comment
  const comment = {
    id: commentId,
    content,
    status: 'pending',
  };

  // Add comment to comments
  comments.push(comment);

  // Add comments to commentsByPostId
  commentsByPostId[postId] = comments;

  // Send comment to client
  res.status(201).send(comments);
});

// Listen to port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});


