const Post = require('../models/posts');
const friendsUtils = require('../utils/friends');
const User = require('../models/users');

exports.userSearch = (req) => {
    return params = { 
        "$text": 
        {"$search" : req.query.search,
        "$caseSensitive": false},
        }
};

exports.postSearch = (req) => {
    if (req.query.privacy == "public") {
       let posts = Post.find({$and: [{privacyLevel: "public"},{state: "published"},{$or: [{title: {$regex: req.query.search}},{description: {$regex: req.query.search}}]}]});
       return posts;
        }
    else if (req.query.privacy == "private") {
        let posts = Post.find({$and: [{authorId: loggedUserId},{state: "published"},{privacyLevel: "private"}]});
        return posts;
        }
    };