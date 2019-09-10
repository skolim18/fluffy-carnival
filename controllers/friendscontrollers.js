const config = require('../config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../models/users');
const friendsUtils = require('../utils/friends');
const mailUtils = require('../utils/mail');

exports.postSendInvite = (req, res, next) => {
    const status = "awaiting";

    User.findById(req.query.id)
    .then(user => {
        if (!user) {
            res.status(400).json({ success: false, msg: "User does not exist!"});
        } 
        else if (req.query.id === loggedUserId) {
            res.status(400).json({ success: false, msg: "You can't invite yourself!"});
            return;
        }
        else if (friendsUtils.areWeFriends(user) == true) {
            res.status(400).json({ success: false, msg: "Already your friend!"});
            return;
        }
        
        mailUtils.sendInvitiationEmail(user);
        
        const friend = {
            requestor: loggedUserId,
            requested: req.query.id,
            status: status,
            inviteToken: inviteToken
        };

        user.friends.push(friend);
        user.save();
        res.send("Invitation request sent");

        const friendRequest = {
            requestor: loggedUserId,
            requested: req.query.id,
            status: status,
            inviteToken: inviteToken
        };

        User.findById(loggedUserId)
        .then(user => {
            user.friends.push(friendRequest);
            user.save();
        })

    })
};

modifyUser = (res, req, users, modificator, status) => {
    users.forEach(user => {
        const friend = user.friends.filter(user => user.inviteToken === req.query.inviteToken)[0];
        modificator(friend);
        user.save();
    })
    res.status(200).send(status);
}

exports.getAcceptInvite = (req, res, next) => {
    User.find({"friends.inviteToken": req.query.inviteToken})
        .then (users => modifyUser(res, req, users, friend => friend.status = "accepted", "Friend request accepted"))
};

exports.getDeclineInvite = (req, res, next) => {
    User.find({"friends.inviteToken": req.query.inviteToken})
        .then (users => modifyUser(res, req, users, friend => friend.remove(), "Friend request declined"))
};

exports.getFriendsList = (req, res, next) => {
    User.findById(loggedUserId)
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "Friends not found" });
            }
            
            const friendsIds = friendsUtils.myFriends(user);

            User.find({"_id": friendsIds})
                .then(users => {
                    const friends = _.map(users, friend => _.pick(friend, ['_id','name','surname','gender','city']));
                    res.send(friends);
                })
        })
    }


exports.getPendingInvites = (req, res, next) => {
    User.findById(loggedUserId)
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "Awaiting friendships not found" });
            }
            const friends = user.friends.filter(user => user.status === "awaiting");
            res.send(friends);
        })
}

exports.deleteFriend = (req, res, next) => {
    User.findById(loggedUserId)
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
            }

            const removedFriend1 = user.friends.find(user => user.requestor == req.body.id);
            removedFriend1.remove();
            user.save();

            User.findById(req.body.id)
            .then(user => {
                if (!user) {
                    res.status(400).json({ success: false, msg: "User not found" });
                }
    
                const removedFriend2 = user.friends.find(user => user.requested == loggedUserId);
                removedFriend2.remove();
                user.save();
            })

            res.status(200).send("Friend removed");
        })
}
