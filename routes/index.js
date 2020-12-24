var express = require('express');
const { default: Stripe } = require('stripe');
var router = express.Router();
var Cart = require('../models/cart');
var Publishable_Key = 'pk_test_51HvfSXFV0g6r9YWu0aO2IbDbRx6jzJ4hdo37ucjKYKsoHSxV1cYyGSJEKFeAKHFGfrVEd4cHPRwfMScqYOnfsdsr00ShkBAVg0';
var Secret_Key = 'sk_test_51HvfSXFV0g6r9YWuXcmGc1Q86lvpbpClUHPOkB8OovezzPJvxQFBzf4gmkNWu6RDoj92lkdjS9DZFSC3MGR1vm8e00yFf7kEUf';
const stripe = require('stripe')(Secret_Key);
var Order = require('../models/order');



var Product = require('../models/product');


/* GET home page. */
router.get('/', function (req, res, next) {



  res.render('view', { style: 'index.css' });

});







router.get('/shop', function (req, res, next) {

  var successMsg = req.flash('success')[0];

  Product.find(function (err, docs) {

    var productList = docs.map(x => x.toObject());


    res.render('shop/index', { title: 'Shopping Cart', products: productList, successMsg: successMsg, noMessages: !successMsg, style: 'product.css' });

  });



});



router.get('/shop/add-to-cart/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {}); //條件? 條件1:條件2
  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/shop');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/shop');
  })
});



router.get('/shop/reduce/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shop/shopping_cart');


});

router.get('/shop/remove/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shop/shopping_cart');


});


router.get('/shop/addByOne/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.addByOne(productId);
  req.session.cart = cart;
  res.redirect('/shop/shopping_cart');


});



router.get('/shop/shopping_cart', function (req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping_cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping_cart', { products: cart.generateArray(), totalPrice: cart.totalPrice, style: 'shoppingcart.css' });
});



router.get('/shop/checkout', isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shop/shopping-cart', { style: 'shoppingcart.css' });
  }
  var cart = new Cart(req.session.cart);

  res.render('shop/checkout', { key: Publishable_Key, send: cart.totalPrice, total: cart.totalPrice * 100, products: cart.generateArray(), style: 'checkout.css' });

});



router.post('/shop/checkout', isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shop/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  //下面要放stripe文件


  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
    .then((customer) => {

      return stripe.charges.create({
        amount: cart.totalPrice * 100,    // Charing Rs 25 
        description: 'Web Development Product',
        currency: 'HKD',
        customer: customer.id
      });
    })
    .then(charge => {
      var order = new Order({
        user: req.user,
        cart: cart,
        paymentId: charge.id,
        name: req.body.name,
        city: req.body.City,
        Area: req.body.Area,
        address: req.body.address,
        phone: req.body.phone,
        Zip: req.body.Zip,
        howpay: req.body.howpay,
        shipping: req.body.shipping,
        date: new Date(),

      });
      order.save(function (err, result) {
        req.session.cart = null;
        res.render('view', { message: '購買成功', style: 'index.css' });



      })

    })
    .catch((err) => {
      res.send(err)    // If some error occurs 
    });


});






module.exports = router;



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');

}

