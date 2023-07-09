var express = require('express');
var router = express.Router();
var userAccessController = require('../controllers/userAccessController');

router.get('/index',userAccessController.get_index);
// router.get('/create', userAccessController.get_accessshare); // Get Share Page (what fields are to be shared)
// router.get('/:id',userAccessController.get_detail);

router.post('/create', userAccessController.post_accessshare); // Will insert record in UserAccess table

module.exports = router;