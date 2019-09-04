const User = require('../models/users');

exports.areWeFriends = user => {
    let friendsCounter = false;
    const friends = user.friends.filter(user => user.status === "accepted");

    friends.forEach(friend => {
        if ((friend.requestor == user.id || friend.requested == user.id) && (friend.requestor == loggedUserId || friend.requested == loggedUserId)) {
            friendsCounter = true;
        }
    })

    return friendsCounter;
};

exports.myFriends = user => {
    let friendsIds = [];
    const friends = user.friends.filter(user => user.status === "accepted")
    friends.forEach(friend => {
        if (friend.requestor == loggedUserId) {
            friendsIds.push(friend.requested);
        }
        else if (friend.requested == loggedUserId) {
            friendsIds.push(friend.requestor);
        }
    })

    return friendsIds;
};

exports.friendsOnly = (user) => {

    let friendsIds = [];
    const friends = user.friends.filter(user => user.status === "accepted")

    friends.forEach(friend => {
        if (friend.requestor == loggedUserId) {
            friendsIds.push(friend.requested);
        }
        else if (friend.requested == loggedUserId) {
            friendsIds.push(friend.requestor);
        }
    })

    if (friendsIds.includes(user.id)) {
        return true;
    }
    else {
        return false;
    }
};