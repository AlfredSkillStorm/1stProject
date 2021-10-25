const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smallCompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    warehouses: [{
        warehouseName: String,
        maxLoad: Number,
        items: [{
            itemName: String,
            price: Number,
            amount: Number
        }]
    }]
})

const SmallCompany = mongoose.model('smallCompany', smallCompanySchema);

module.exports = SmallCompany;