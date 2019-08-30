const Post = require('../models/posts');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const fs = require('fs');
const filesUtils = require('../utils/files');

exports.postAddNew = (req, res, next) => {
    if (!req.body.title || !req.body.description) {
        res.status(401).send('Missing required data!');
        return;
    }

    let NewPost = new Post({
        authorId: loggedUserId,
        title: req.body.title,
        description: req.body.description,
        privacyLevel: req.body.privacyLevel,
        publishDate: req.body.publishDate,
        state: req.body.state,
        tags: req.body.tags
    });

    NewPost.save();
    res.status(200).json({ success: true, msg: "Post created!" });
};

exports.getFindPost = (req, res, next) => {
    Post.find({
        $or: [
        {$and: [{ _id: req.query.id}, {privacyLevel: "public"}]}, 
        {$and: [{description: req.query.description}, {privacyLevel: "public"}]},
        {$and: [{title: req.query.title}, {privacyLevel: req.query.privacyLevel}]}]
       })
        .then (posts => {
            if (!posts) {
                res.status(400).json({ success: false, msg: "Posts not found" });
            }

            const foundPosts = _.map(posts, post => _.pick(post, ['title','publishDate','description','tags'])); 
            res.send(foundPosts);
            return;
        });
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.body.id})
        .then(post => {
            if (!post) {
            res.status(400).json({ success: false, msg: "Post not found"});
            }             
            else if (post.authorId != loggedUserId) {
            res.status(400).json({success: false, msg: "Your not allowed to delete other user's post."});
            return;
            }
        
            post.remove();
            res.status(200).send("Post removed!");
    })
};

exports.patchUpdatePost = (req, res, next) => {
    Post.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        description: req.body.description,
        privacyLevel: req.body.privacyLevel,
        publishDate: req.body.publishDate,
        state: req.body.state,
        tags: req.body.tags
        })
        .then (post => {
            if (!post) {
                res.status(400).json({ success: false, msg: "Post not found" });
                return;
            }
            else if (post.authorId != loggedUserId) {
                res.status(400).json({success: false, msg: "Your not allowed to modify other user's post."});
                return;
            }
        
            post.save();
            res.status(200).json({ success: true, msg: "Post updated" });
            return;
        });
};

exports.patchPublishPost = (req, res, next) => {
    Post.findById(req.query.id)
        .then (post => {
            if (!post) {
                res.status(400).json({ success: false, msg: "Post not found" });
                return;
            }
            else if (post.authorId != loggedUserId) {
                res.status(400).json({success: false, msg: "Your not allowed to publish other user's post."});
                return;
            }
        
            post.state = "published";
            post.save();
            res.status(200).json({ success: true, msg: "Post published!" });
            return;
        });
};