const router = require('express').Router();
const Post = require('../models/posts');
const postControllers = require('../controllers/postcontrollers');
const authenticate = require('../utils/authenticate');

router.post('/add', authenticate.verifyToken, postControllers.postAddNew);
router.get('/find', authenticate.verifyToken, postControllers.getFindPost);
router.delete('/delete', authenticate.verifyToken, postControllers.deletePost);
router.patch('/update', authenticate.verifyToken, postControllers.patchUpdatePost);
router.patch('/publish', authenticate.verifyToken, postControllers.patchPublishPost);

module.exports = router;
