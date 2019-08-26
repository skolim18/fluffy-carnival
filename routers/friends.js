const router = require('express').Router();
const User = require('../models/users');
const friendsControllers = require('../controllers/friendscontrollers');
const authenticate = require('../utils/authenticate');

router.post('/friends/invite', authenticate.verifyToken, friendsControllers.postSendInvite);
router.get('/friends/accept', authenticate.verifyToken, friendsControllers.getAcceptInvite);
router.get('/friends/decline', authenticate.verifyToken, friendsControllers.getDeclineInvite);

module.exports = router;