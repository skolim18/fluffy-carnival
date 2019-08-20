const router = require('express').Router();
const Post = require('../models/posts');
const postControllers = require('../controllers/postcontrollers');

router.post('/posts/add', postControllers.postAddNew);
router.get('/posts/find', postControllers.getFindPost);

module.exports = router;
