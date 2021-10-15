const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    maxLoad: Number,
    items: [{
        name: String,
        price: Number
    }]
})

const Warehouse = mongoose.model('warehouse', warehouseSchema);

module.exports = Warehouse;