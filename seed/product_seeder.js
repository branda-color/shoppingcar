var Product = require('../models/product');

var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/shopping';
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;


var db = mongoose.connection;

db.on('open', function () {
    console.log('成功')
});

db.on('error', function () {
    console.log('失敗');
})




var products = [
    new Product({
        imagePath: 'https://i.postimg.cc/0y4j0g0f/aloeface.jpg',
        title: '無香料蘆薈保濕水乳液(50g)',
        description: '純天然無添加保濕乳液',
        price: 1280
    }),
    new Product({
        imagePath: 'https://i.postimg.cc/NfgKgk01/aloeveragel.jpg',
        title: '有機草本蘆薈膠(100ml)',
        description: '純天然無添加，萬用膏',
        price: 499
    }),
    new Product({
        imagePath: 'https://i.postimg.cc/YC0jF2Y0/cajeput.jpg',
        title: '白千層芳療精油(10ml)',
        description: '純天然無添加，芳療級使用',
        price: 980
    }),

    new Product({
        imagePath: 'https://i.postimg.cc/kXfBDRVL/lemograss.jpg',
        title: '檸檬草精油滾珠棒(9ml)',
        description: '純天然無添加，蚊蟲叮咬免慌張',
        price: 399
    }),

    new Product({
        imagePath: 'https://i.postimg.cc/VNgn17jb/sandalwood.jpg',
        title: '100%檀香精油純露(200ml)',
        description: '純天然無添加，提神醒腦就靠他',
        price: 780
    }),



];

var done = 0;

for (var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }

    });

}

function exit() {
    mongoose.disconnect();
}

