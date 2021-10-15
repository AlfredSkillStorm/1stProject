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

const deleteWarehouse = async (name, warehouseName) => {
    try {
        await mongoose.connect(process.env.ATLAS_URL);
        const smallCompany = await SmallCompany.findOne({name});
        //await SmallCompany.deleteOne({$pull: {warehouses: [{warehouseName}]}});
        //await SmallCompany.deleteOne({name});
        console.log('Printing small company details');
        console.log(smallCompany);
        console.log(smallCompany.warehouses);

        // const warehouses = smallCompany.warehouses;

        // const updatedWarehouses = warehouses.filter(warehouse => warehouse.warehouseName !== warehouseName);

        // console.log(updatedWarehouses);
        //await SmallCompany.deleteOne({$pull: {warehouses: [{warehouseName}]}});
        //await SmallCompany.updateOne({name},{warehouses: updatedWarehouses});
        await SmallCompany.updateOne({name},{$pull: {warehouses: {warehouseName}}});

        //console.log('Printing small company details after delete');
        //console.log(smallCompany.warehouses);
        mongoose.connection.close();
        //console.log("Deleted Small Company");
        return;
    } catch (err) {
        mongoose.connection.close();
        throw err;
    }
};

module.exports = {
    addWarehouse,
    deleteWarehouse
}