const Post = require('../models/posts');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const searchParams = require('../utils/search');
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

exports.getFindPost = async (req, res, next) => {
    const posts = await searchParams.postSearch(req);
        
    if (!posts || posts.length == 0) {
        res.status(400).json({ success: false, msg: "Posts not found" });
        return;
    }

    const foundPosts = _.map(posts, post => _.pick(post, ['id','title','publishDate','authorId','description','tags','privacyLevel'])); 
    res.send(foundPosts);
            
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
    Post.findByIdAndUpdate(req.query.id, {$set: req.body})
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