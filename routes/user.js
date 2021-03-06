var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
const { session } = require('passport');
var Order = require('../models/order');
var Cart = require('../models/cart');
var Schedule = require('../models/schedule');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/historyschedule', isLoggedIn, function (req, res, next) {
    Schedule.find({ user: req.user }, function (err, schedule) {
        if (err) {
            return res.write('Error');
        }

        res.render('reserve/oldschedule', { schedule: schedule, style: 'oldschedule.css', title: '預約紀錄' });
    })
        .lean();
});



router.get('/profile', isLoggedIn, function (req, res, next) {
    Order.find({ user: req.user }, function (err, orders) {
        if (err) {
            return res.write('Error');
        }

        var cart;
        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', { orders: orders, style: 'profile.css', title: '歷史訂單' });
    })
        .lean();
});




router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});



router.use('/', notLoggedIn, function (req, res, next) {
    next();
})


router.get('/signup', function (req, res, next) {
    var message = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken(), message: message, hasErrors: message.length > 0, style: 'signup.css', title: '註冊會員 ' });

});


router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true

})
    , function (req, res, next) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/');
        }
    });






router.get('/signin', function (req, res, next) {
    var message = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken(), message: message, hasErrors: message.length > 0, style: 'signin.css', title: '登入會員' });

});


router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true

}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);

    } else {
        res.redirect('/');
    }
});






module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');

}


function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');

}


