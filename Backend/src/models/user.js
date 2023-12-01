const mongoose = require("mongoose")
const Schema = mongoose.Schema;
var moment = require('moment');

var utcDate = moment.utc().toDate();

const userSchema = new Schema({
    name: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: Number, default: null },
    password: { type: String, default: null },
    resetToken: { type: String, default: null },
    isVerified: { type: Number, default: 0 },
    createdDate: { type: Date, default: utcDate }
});


module.exports = mongoose.model('User', userSchema);