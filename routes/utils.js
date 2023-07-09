var express = require('express');
var router = express.Router();
const utilsController = require('../controllers/utilsController');
const userAccessController = require('../controllers/userAccessController');


router.get('/welcome', (req, res)=> {
    res.render('utils/welcome', {user: req.user})
})

router.get('/details', utilsController.get_details);
router.get('/edit', utilsController.get_edit);


router.post('/edit', utilsController.post_edit);

module.exports = router;