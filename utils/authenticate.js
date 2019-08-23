var jwt = require('jsonwebtoken');
var config = require('../config');

exports.verifyToken = (req, res, next) => {
    var token = req.headers['token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, config.server.secret, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
      req.id = decoded.id;
      next();
    });
  }