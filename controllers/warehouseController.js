const mongoose = require('mongoose');
const SmallCompany = require('../models/SmallCompany.js');

const addWarehouse = async (companyName,{warehouseName, maxLoad}) => {
    try{
        await mongoose.connect(process.env.ATLAS_URL);
        const warehouse = {warehouseName, maxLoad};
        const smallCompany = await SmallCompany.findOne({name: companyName});
        console.log(smallCompany);
        const arr = smallCompany.warehouses;
        arr.push(warehouse);
        await SmallCompany.findOneAndUpdate({name: companyName},{warehouses: arr});

        console.log("Inside addWarehouse. Returning now...");
        return {status: 200, message: `Inside addWarehouse: warehouseController. Returning now...`};
    } catch(err){
        mongoose.connection.close();
        throw {status: 500, error: `Saving warehouse failed`}
    }
};

const getWarehouses = async ({name}) => {
    try{
        await mongoose.connect(process.env.ATLAS_URL);
        const smallCompany = await SmallCompany.findOne({name});

        if(smallCompany.warehouses.length === 0){
            throw {status: 500,  error: 'No warehouses available'};
        }
        mongoose.connection.close();
        return smallCompany.warehouses;
    } catch(err){
        mongoose.connection.close();
        throw err;
    }
};

const deleteWarehouse = async (name, warehouseName) => {
    try {
        await mongoose.connect(process.env.ATLAS_URL);
        const smallCompany = await SmallCompany.findOne({name});
        console.log('Printing small company details');
        console.log(smallCompany);
        console.log(smallCompany.warehouses);

        await SmallCompany.updateOne({name},{$pull: {warehouses: {warehouseName}}});

        mongoose.connection.close();
        return;
    } catch (err) {
        mongoose.connection.close();
        throw err;
    }
};

module.exports = {
    addWarehouse,
    deleteWarehouse,
    getWarehouses
}