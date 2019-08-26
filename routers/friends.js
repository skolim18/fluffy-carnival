const router = require('express').Router();
const User = require('../models/users');
const friendsControllers = require('../controllers/friendscontrollers');
const authenticate = require('../utils/authenticate');

router.post('/friends/invite', authenticate.verifyToken, friendsControllers.postSendInvite);
router.get('/friends/accept', authenticate.verifyToken, friendsControllers.getAcceptInvite);
router.get('/friends/decline', authenticate.verifyToken, friendsControllers.getDeclineInvite);
router.get('/friends/all', authenticate.verifyToken, friendsControllers.getFriendsList);
router.get('/friends/pending', authenticate.verifyToken, friendsControllers.getPendingInvites);
router.delete('/friends/remove', authenticate.verifyToken, friendsControllers.deleteFriend);

module.exports = router;