const Inventory = require('../models/inventory')
const sendEmail = require('../services/sendEmail')
const { successResponse } = require('../utils/response')

let receipents = []

const generateReport = async (req, res, next) => {
    let receiver = receipents.toString()
    let subject = "Sales Report";
    let body = "Sales Report Body showing Profit and Loss!";
    sendEmail(receiver, subject, body)
}
const reportReceiver = async (req, res, next) => {
    let _receipents = req.body.receipent.split(',')
    _receipents.forEach(recep => {
        if (!receipents.includes(recep)) {
            receipents.push(recep)
        }
    });
    return res.send(successResponse({}))
}


module.exports = { generateReport, reportReceiver }