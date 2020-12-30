var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    schedule: { type: String, required: true },
    person: { type: Number, required: true },
    class: { type: String, required: true },
    time: { type: String, required: true },
    note: { type: String }


});


module.exports = mongoose.model('Schedule', schema);