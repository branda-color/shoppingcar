const { Double } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('/');
}


var schema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cart: { type: Object, required: true },
    paymentId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: Object, required: true },
    date: {
        type: String,
        required: true,
        set: date => formatDate(date)
    },
    city: { type: String, required: true },
    Area: { type: String, required: true },
    Zip: { type: String, required: true },
    howpay: { type: Object, required: true },
    shipping: { type: Object, required: true },


});






module.exports = mongoose.model('Order', schema);