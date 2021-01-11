var mongoose = require('mongoose');
var Schema = mongoose.Schema;


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month, day, year,].join('/');
}




var schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: {
        type: String,
        required: true,
        set: date => formatDate(date)
    },
    schedule: { type: String, required: true },
    person: { type: Number, required: true },
    class: { type: String, required: true },
    time: { type: String, required: true },
    note: { type: String }


});


module.exports = mongoose.model('Schedule', schema);