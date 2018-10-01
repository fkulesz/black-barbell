var express = require("express");
var router = express.Router();
var SessionsController = require('../controllers/SessionsController');

router.post('/api/login', SessionsController.loginUser);

module.exports = router;