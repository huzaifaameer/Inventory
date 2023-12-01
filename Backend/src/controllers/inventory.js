const Inventory = require('../models/inventory')

const { errorResponse, successResponse, response } = require('../utils/response');

const addRecord = async (req, res, next) => {
    const { material, quantity, buyPrice, expectedProducedUnits, expectedExpense, buyDate } = req.body
    const record = await Inventory.create({ material, quantity, buyPrice, expectedProducedUnits, expectedExpense, buyDate })
    return res.send(successResponse({ record: record._id }))
}

const updateRecord = async (req, res, next) => {
    try {
        const id = req.query.recordId
        const { producedUnits, actualExpense, soldPrice, soldDate } = req.body
        const record = await Inventory.findById(id);
        record.actualProducedUnits = producedUnits;
        record.actualExpense = actualExpense;
        record.soldPrice = soldPrice;
        record.soldDate = soldDate;
        await record.save()
        const resp = new response()
        resp.message = "Record Updated successfull!"
        resp.data = { record: record._id }
        return res.send(resp)

    } catch (error) {
        return res.send(errorResponse(error.message))
    }
}

const removeRecord = async (req, res, next) => {
    try {
        const { recordId } = req.body;
        const record = await Inventory.findById(recordId);
        record.isDeleted = true;
        await record.save()
        const resp = new response()
        resp.message = "Record Deleted successfull!"
        resp.data = {}
        return res.send(resp)
    } catch (error) {
        return res.send(errorResponse(error.message))
    }
}

const fetchRecord = async (req, res, next) => {
    const id = req.query.recordId
    if (id) {
        // check if id is provided return data of provided id
        const record = await Inventory.findById(id)
        return res.send(successResponse({ record }))
    }

    // else if no id is provided return all records
    const records = await Inventory.find()
    return res.send(successResponse({ records }))

}

module.exports = { addRecord, fetchRecord, updateRecord, removeRecord }
