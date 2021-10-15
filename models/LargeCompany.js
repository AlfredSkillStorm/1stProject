const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const largeCompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    smallCompanies: [String]
})

const LargeCompany = mongoose.model('largeCompany', largeCompanySchema);

module.exports = LargeCompany;