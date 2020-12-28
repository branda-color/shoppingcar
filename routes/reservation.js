var express = require('express');
var router = express.Router();



router.get('/news', function (req, res, next) {


    res.render('interview/news', { style: 'news.css' });

});






module.exports = router;