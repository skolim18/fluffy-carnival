const router = require('express').Router();
const Post = require('../models/posts');
const postControllers = require('../controllers/postcontrollers');
const authenticate = require('../utils/authenticate');

router.post('/posts/add', authenticate.verifyToken, postControllers.postAddNew);
router.get('/posts/find', authenticate.verifyToken, postControllers.getFindPost);
router.delete('/posts/delete', authenticate.verifyToken, postControllers.deletePost);
router.patch('/posts/update', authenticate.verifyToken, postControllers.patchUpdatePost);
router.patch('/posts/publish', authenticate.verifyToken, postControllers.patchPublishPost);

module.exports = router;
