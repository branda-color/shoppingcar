var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail().withMessage('請輸入正確的email');
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 }).withMessage('密碼不得為空，且至少需4位');
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);

        });

        return done(null, false, req.flash('error', messages));

    }
    User.findOne({ 'email': email }, function (err, user) {
        if (err) {
            return done(err);
        }
        else if (user) {
            return done(null, false, { message: '此email已有人註冊，請重新輸入' });
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });

}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, function (req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail().withMessage('請輸入正確的email');
    req.checkBody('password', 'Invalid password').notEmpty().withMessage('請輸入正確密碼');
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);

        });

        return done(null, false, req.flash('error', messages));

    }
    User.findOne({ 'email': email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: '無此使用者，請重新輸入' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: '密碼錯誤請重新輸入' });
        }

        return done(null, user);
    });

}));