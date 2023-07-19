//create web server
const express = require("express");
const router = express.Router();
//import model for comments
const Comment = require("../models/comment");
//import middleware
const { jwtAuth } = require("../middleware/auth");
//import error handler
const { errorHandler } = require("../middleware/error");
//import mongoose
const mongoose = require("mongoose");
//import model for users
const User = require("../models/user");

//get all comments
router.get("/", jwtAuth, async (req, res, next) => {
  try {
    //get all comments
    const comments = await Comment.find();
    //return comments
    return res.json(comments);
  } catch (err) {
    return next(err);
  }
});

//get all comments for a post
router.get("/:postId", jwtAuth, async (req, res, next) => {
  try {
    //get all comments for a post
    const comments = await Comment.find({ postId: req.params.postId });
    //return comments
    return res.json(comments);
  } catch (err) {
    return next(err);
  }
});

//add a comment
router.post("/", jwtAuth, async (req, res, next) => {
  try {
    //create comment
    const comment = await Comment.create(req.body);
    //return comment
    return res.json(comment);
  } catch (err) {
    return next(err);
  }
});

//update a comment
router.patch("/:id", jwtAuth, async (req, res, next) => {
  try {
    //find comment
    const comment = await Comment.findById(req.params.id);
    //if comment not found
    if (!comment) {
      //throw error
      throw new Error("Comment not found");
    }
    //update comment
    comment.set(req.body);
    //save comment
    await comment.save();
    //return updated comment
    return res.json(comment);
  } catch (err) {
    return next(err);
  }
});

//delete a comment
router.delete("/:id", jwtAuth, async (req, res, next) => {
  try {
    //find comment
    const comment = await Comment.findById(req.params.id);
    //if comment not found
    if (!comment) {
      //throw error
      throw new Error("Comment not found");
    }
    //delete comment
    await comment.remove();
    //return message
    return