const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

// Load User model
const User = require('../models/user');

module.exports = function (passport) {
    console.log('Trying passport configuration');
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Validate that user exist
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }
                    //Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false, { message: 'Password incorrect' });
                        }
                    });
                })
        })

    );
    passport.serializeUser(function(user, done) {
        console.log('serialize');
        done(null, user.id);
    });
    
    
    passport.deserializeUser(function(id, done) {
        console.log('deserialize');
        User.findById({_id: id})
            .then(result =>{
                return done(null, result)
            })
            .catch(err =>{
                console.log(err)
            })
        
    });
}