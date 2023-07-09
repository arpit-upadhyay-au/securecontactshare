const UserAccess = require("../models/userAccess");
const User = require('../models/user');

const get_details = (req, res) => {
    // Every request has user attached to the session
    console.log(req.user);
    res.render('utils/details',{user: req.user});
}

const get_edit = (req, res) => {
    // Every request has user attached to the session
    res.render('utils/edit',{user: req.user});
}

const post_edit = (req, res) =>{
    console.log(req.body);
    User.findByIdAndUpdate(req.user.id, req.body)
        .then(result => {
            res.render('utils/welcome', {message: 'Your details were updated', messageClass: 'alert-success', user: req.user});
        })
        .catch(err => {
            console.log(err);
        });
    }

module.exports = {
    get_details,
    get_edit,
    post_edit
}