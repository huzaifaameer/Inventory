const mongoose = require("mongoose")
const Schema = mongoose.Schema;
var moment = require('moment');

var utcDate = moment.utc().toDate();

const userOtpSchema = new Schema({
    email: { type: String, default: null },
    otp: { type: Number, default: null },
    timeStamp: { type: Date, default: utcDate },
});


module.exports = mongoose.model('OTP', userOtpSchema);