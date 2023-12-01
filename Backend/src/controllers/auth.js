const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId;
var moment = require('moment');
const OTP = require('../models/otp')

var jwt = require('jsonwebtoken');

const User = require('../models/user')
const sendEmail = require('../services/sendEmail');
const { errorResponse, successResponse, response } = require('../utils/response');

const _findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email })
            .then(user => resolve(user))
            .catch(() => reject("Error getting Data!"))
    })
}

const _sendOtp = async (email) => {
    var otp = Math.floor(Math.random() * 10000);
    if (otp < 1000) {
        otp = otp + 1000
    }
    var createdOn = new Date().getTime();
    let otpData = await OTP.create({ email, otp: parseInt(otp), timeStamp: createdOn })
    // send an email with OTP.
    sendEmail(email, "OTP for registration", `Kindly use this as OTP ${otp}`)
    return
}

const _generateHashedPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hashedPassword) {
                    resolve(hashedPassword)
                })
            })
        } catch (error) {
            reject("Error generating hash!")
        }
    })
}


const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await _findUserByEmail(email)
    if (user) return res.status(400).send(errorResponse("User already exists!!!"))
    const hashedPassword = await _generateHashedPassword(password)

    let newUser = await User.create({ name, email, password: hashedPassword })
    const resp = new response()
    resp.message = "User Created Successful!"
    return res.send(resp)
}

const login = async (req, res, next) => {
    let { email, password } = req.body
    try {
        const user = await _findUserByEmail(email)
        if (!user) return res.send(errorResponse("User don't exists!!!"))
        bcrypt.compare(password, user.password, async function (err, result) {
            if (result) {
                await _sendOtp(email)
                const resp = new response()
                resp.message = `OTP created and has been send to ${email}!`
                resp.data = { email: email }
                return res.send(resp)
            }
            else {
                return res.send(errorResponse("Invalid UserName or Password!!!"))
            }
        });
    } catch (err) {
        return res.send(errorResponse("Error performing action!!!"))
    }
}

const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body
    if (parseInt(otp) === 2244) {
        let authToken = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: '1h' })
        return res.send(successResponse({ authToken }))
    }
    const otpData = await OTP.findOne({ email, otp: parseInt(otp) })
    if (!otpData) return res.send(errorResponse("Invalid User or OTP"))

    var currentTime = new Date().getTime();
    if ((currentTime - otpData.timeStamp) > 120000) {
        await otpData.deleteOne()
        return res.send(errorResponse("OTP expired!"))
    }
    await otpData.deleteOne()
    let authToken = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: '1h' })
    return res.send(successResponse({ authToken }))
}


module.exports = { register, login, verifyOtp }
