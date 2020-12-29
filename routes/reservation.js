var express = require('express');
var router = express.Router();



router.get('/news', function (req, res, next) {


    res.render('interview/news', { style: 'news.css', title: '最新消息' });

});

router.get('/bali', function (req, res, next) {


    res.render('interview/bali', { style: 'bali.css', title: '最新消息' });

});


router.get('/oil', function (req, res, next) {


    res.render('interview/oil', { style: 'bali.css', title: '最新消息' });

});


router.get('/birth', function (req, res, next) {


    res.render('interview/birth', { style: 'bali.css', title: '最新消息' });

});

router.get('/group', function (req, res, next) {


    res.render('interview/group', { style: 'bali.css', title: '最新消息' });

});



router.get('/introbody', function (req, res, next) {


    res.render('interview/introbody', { style: 'bali.css', title: '全身淋巴按摩' });

});



router.get('/introface', function (req, res, next) {


    res.render('interview/introface', { style: 'bali.css', title: '美肌護理' });

});






module.exports = router;