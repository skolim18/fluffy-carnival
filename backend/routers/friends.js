const router = require('express').Router();
const User = require('../models/users');
const friendsControllers = require('../controllers/friendscontrollers');
const authenticate = require('../utils/authenticate');

router.post('/invite', authenticate.verifyToken, friendsControllers.postSendInvite);
router.get('/accept', authenticate.verifyToken, friendsControllers.getAcceptInvite);
router.get('/decline', authenticate.verifyToken, friendsControllers.getDeclineInvite);
router.get('/all', authenticate.verifyToken, friendsControllers.getFriendsList);
router.get('/pending', authenticate.verifyToken, friendsControllers.getPendingInvites);
router.delete('/remove', authenticate.verifyToken, friendsControllers.deleteFriend);

module.exports = router;