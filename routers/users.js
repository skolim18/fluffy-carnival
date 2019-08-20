const router = require('express').Router();
const User = require('../models/users');
const config = require('../config');
const userControllers = require('../controllers/usercontrollers');

router.post('/register', userControllers.postRegisterUser);
router.get('/activate', userControllers.getActivateUser);
router.post('/authenticate', userControllers.postAuthenticateUser);
router.get('/reset', userControllers.getResetPassword);
router.post('/reset',userControllers.postResetPassword);
router.put('/reset', userControllers.putResetPassword);

module.exports = router;