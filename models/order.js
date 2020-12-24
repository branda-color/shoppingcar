var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cart: { type: Object, required: true },
    paymentId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: Object, required: true },
    date: { type: String, required: true },
    city: { type: String, required: true },
    Area: { type: String, required: true },
    Zip: { type: String, required: true },
    howpay: { type: Object, required: true },
    shipping: { type: Object, required: true },

});


module.exports = mongoose.model('Order', schema);