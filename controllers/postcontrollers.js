const Post = require('../models/posts');

exports.postAddNew = req, res, next) => {
    if (!req.body.title || !req.body.description) {
        res.status(401).send('Missing required data!');
        return;
    }

    let NewPost = new Post({
        title: req.body.title,
        description: req.body.description
    });

    NewPost.save();
    res.status(200).json({ success: true, msg: "Post created!" });
};

exports.getFindPost = (req, res, next) => {
    Post.findOne({ title: req.body.title})
        .then (post => {
            if (!post) {
                res.status(400).json({ success: false, msg: "Post not found" });
            }

            res.send(post);
        });
    Post.findOne({ _id: req.body.id})
        .then (post => {
            if (!post) {
                res.status(400).json({ success: false, msg: "Post not found" });
            }

            res.send(post);
        });   
};