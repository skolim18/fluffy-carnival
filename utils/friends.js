const User = require('../models/users');

exports.areWeFriends = user => {
    User.findById(user.id)
    .then(user => {
        const friends = user.friends.filter(user => user.status === "accepted");
        let friendsCounter = 0;

        friends.forEach(friend => {
            if ((friend.requestor == user.id || friend.requested == user.id) && (friend.requestor == loggedUserId || friend.requested == loggedUserId)) {
                friendsCounter = friendsCounter + 1;
            }
        })
        console.log(friendsCounter);
        if (friendsCounter > 0) {
            return true;
        } else 
        {
            return false;
        }
    })
}