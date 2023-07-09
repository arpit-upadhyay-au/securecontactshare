var express = require('express');
var router = express.Router();



/* GET users listing. */


const userController = require('../controllers/userController');


router.get('/login', userController.get_login);
router.get('/register', userController.get_register);

router.post('/register', userController.post_register);
router.post('/login', userController.post_login);

router.get('/logout', userController.get_logout);




module.exports = router;