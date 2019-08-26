const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Friend = require('../models/users');
const mailUtils = require('../utils/mail');

exports.postSendInvite = async (req, res, next) => {
    const status = "awaiting";
    //finding logged user and inviting a friend be id, adding request to friend in the database
    await User.findById(req.body.id)
    .then(async user => {
        if (!user) {
        res.status(400).json({ success: false, msg: "User does not exist!"});
        }

        await mailUtils.sendInvitiationEmail(user);
        
        const friend = {
            friendId: req.body.id,
            status: status,
            inviteToken: inviteToken
        };

        User.findById(req.body.id)
        .populate('friends', friend)
        .then(async user => {
            user.save();
            res.status(200).send("Invitation sent!");
        })

        const friendRequest = {
            friendId: req.id,
            status: status,
            inviteToken: inviteToken
        };

        //adding a friend request for the logged user
        await User.findById(req.id).populate('friends', friendRequest)
        .then(async user => {
            user.save();
        })

    })
};

exports.getAcceptInvite = (req, res, next) => {
    User.findOneAndUpdate({'friends.inviteToken': req.query.inviteToken}, {'friends.status': "accepted"})
    .then(user => {
        if (!user) {
            res.status(400).json({ success: false, msg: "Something went wrong!"});
        }
        user.save();

        User.findOneAndUpdate({'friends.friendId': req.id}, {'friends.status': "accepted"})
        .then(user => {
            user.save();
        });

        res.status(200).send("Friend request accepted");
    })
};

exports.getDeclineInvite = (req, res, next) => {
    User.findOneAndUpdate({'friends.inviteToken': req.query.inviteToken}, {'friends.status': "declined"})
    .then(user => {
        if (!user) {
            res.status(400).json({ success: false, msg: "Something went wrong!"});
        }
        user.save();

        User.findOneAndUpdate({'friends.friendId': req.id}, {'friends.status': "declined"})
        .then(user => {
            user.save();
        });

        res.status(200).send("Friend request declined");
    })
};