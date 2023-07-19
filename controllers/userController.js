const User = require('../models/user');
const UserAccess = require('../models/userAccess');
var $ = require("jquery");

var passport = require('passport');
var bcrypt = require('bcrypt');

const get_login = (req, res) => {
    res.render('user/login', {user: req.user});
}
const get_register = (req, res) => {
    res.render('user/register',{user: req.user});
}
const post_login = (req, res, next) => {
    console.log('trying post login');
    passport.authenticate('local', {
        successRedirect: '/utils/welcome',
        failureRedirect: '/user/login'
    }) (req, res, next);
}
const post_register = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            res.render('user/register', {message: 'User Exists with the email provided',
            messageClass: 'alert-danger'});
        } else {
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                    res.redirect('/user/login');
                })
                .catch(err => console.log(err));
            });
        });
        }
    })
    .catch(err => {
        console.log(err);
        res.render('user/register',{message: 'Internal Server Error, please try again later',
                    messageClass: 'alert-warning'});
    })
}

const get_logout = (req, res, next) => {
    console.log('trying to logout')
    req.session.destroy(function (err) {
        console.log('logging out');
        res.render('index',{message: 'You have logged out successfully!',
        messageClass: 'alert-success', user: null, shared_details: null}); 
    });
}

const getdetailsfromaccesscode = (req, res) => {
    // Query useraccess table using the code entered by requestor
    UserAccess.find({accesscode: req.body.accesscode, expirydate: {$gt: new Date()} })
        .then(uacrecord => {
            
            if(uacrecord.length !== 0){
                let userid = uacrecord[0].userid;
                let fieldlist = uacrecord[0].fieldlist.replace(',',' ');

                User.findById(userid).select(fieldlist)
                    .then(result =>{
                        console.log('Came in success');
                        res.render('index',{message: 'Success, here are the details you requested!', 
                            messageClass: 'alert-success', user: req.user, shared_details: result});

                        
                    })
                    .catch(err =>{
                        console.log('Came in error')
                        res.render('index',{message: 'Code is already expired/doesn\'t exists', 
                            messageClass: 'alert-danger', user: req.user, shared_details: null});
                    })

                
            }else{
                console.log('inside else');
                res.render('index',{message: 'Invalid Code, please try again!', 
                messageClass: 'alert-danger', user: req.user, shared_details: null});
            }
        })
        .catch(err => {
            res.render('index',{message: 'Internal server error, please try again!', 
                messageClass: 'alert-danger', user: req.user, shared_details: null});
        })

}

module.exports = {
    get_login,
    get_register,
    post_login,
    post_register,
    get_logout,
    getdetailsfromaccesscode
}