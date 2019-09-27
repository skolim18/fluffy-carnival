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

exports.postSearch = async (req) => {
    if (req.query.privacy == "all") {
        const user = await User.findById(loggedUserId);
        const friendsIds = friendsUtils.myFriends(user);
        let posts = await Post.find({$or: 
        [{$and: [{authorId: friendsIds},{state: "published"},{privacyLevel: "friendsOnly"}]}, 
        {$and: [{authorId: loggedUserId},{state: "published"},{privacyLevel: "private"}]}, 
        {$and: [{privacyLevel: "public"},{state: "published"}]}]});
        return posts;
    }
    if (req.query.privacy == "public") {
       let posts = await Post.find({$and: [{privacyLevel: "public"},{state: "published"},{$or: [{title: {$regex: req.query.search}},{description: {$regex: req.query.search}}]}]});
       return posts;
        }
    else if (req.query.privacy == "private") {
        let posts = await Post.find({$and: [{authorId: loggedUserId},{state: "published"},{privacyLevel: "private"}]});
        return posts;
        }
    else if (req.query.privacy == "friendsonly") {
        const user = await User.findById(loggedUserId);
        const friendsIds = friendsUtils.myFriends(user);
        let posts = await Post.find({$and: [{authorId: friendsIds},{state: "published"},{privacyLevel: "friendsOnly"}]});
        return posts;
        }
    };