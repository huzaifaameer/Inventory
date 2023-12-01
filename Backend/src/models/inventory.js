const mongoose = require("mongoose")
const Schema = mongoose.Schema;
var moment = require('moment');
const { number } = require("joi");

var utcDate = moment.utc().toDate();
const inventorySchema = new Schema({
    material: { type: String, default: null },
    quantity: { type: Number, default: 0 },
    buyPrice: { type: Number, default: 0 },
    buyDate: { type: Date, default: utcDate },
    expectedProducedUnits: { type: Number, default: 0 },
    expectedExpense: { type: Number, default: 0 },

    actualProducedUnits: { type: Number, default: 0 },
    actualExpense: { type: Number, default: 0 },
    soldPrice: { type: Number, default: 0 },
    soldDate: { type: Date, default: null },

    isDeleted: { type: Boolean, default: false },
    createdDate: { type: Date, default: utcDate }
})

module.exports = mongoose.model('Inventory', inventorySchema);
