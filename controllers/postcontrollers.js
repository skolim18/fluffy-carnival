const Post = require('../models/posts');
const jwt = require('jsonwebtoken');

exports.postAddNew = (req, res, next) => {
    if (!req.body.title || !req.body.description) {
        res.status(401).send('Missing required data!');
        return;
    }

    let NewPost = new Post({
        authorId: req.id,
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
        $or: 
        [{$and: [{ _id: req.body.id}, {privacyLevel: "public"}]}, 
        {$and: [{authorId: req.id}, {privacyLevel: "private"}]}, 
        {$and: [{description: req.body.description}, {privacyLevel: "public"}]},
        {$and: [{title: req.body.title}, {privacyLevel: req.body.privacyLevel}]}]
       })
        .then (post => {
            if (!post) {
                res.status(400).json({ success: false, msg: "Post not found" });
            }

            res.send(post);
            return;
        });
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.body.id})
        .then(post => {
            if (!post) {
            res.status(400).json({ success: false, msg: "Post not found"});
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
        
            post.save();
            res.status(200).json({ success: true, msg: "Post updated" });
            return;
        });
};

exports.patchPublishPost = (req, res, next) => {
    Post.findByIdAndUpdate(req.body.id, {
        state: req.body.state})
        .then (post => {
            if (!post) {
                res.status(400).json({ success: false, msg: "Post not found" });
                return;
            }
        
            post.save();
            res.status(200).json({ success: true, msg: "Post published!" });
            return;
        });
};