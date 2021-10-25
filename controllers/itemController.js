const mongoose = require('mongoose');
const SmallCompany = require('../models/SmallCompany.js');

const addItem = async (name, warehouseName, {itemName, price}) => {
    try{
        await mongoose.connect(process.env.ATLAS_URL);
        const item = {itemName, price};
        
        const smallCompany = await SmallCompany.findOne({name});
        
        const warehouses = smallCompany.warehouses;
        const filteredWarehouse= warehouses.filter(warehouse => warehouse.warehouseName === warehouseName);
        const warehouse = filteredWarehouse[0];
        const items = warehouse.items;
        items.push(item);
        
        await SmallCompany.findOneAndUpdate({name},{warehouses: warehouses});
        
        mongoose.connection.close();
        
        console.log("Inside addItem. Returning now...");
        return {status: 200, message: `Item Saved successfully!`};
    } catch(err){
        mongoose.connection.close();
        throw {status: 500, error: `Saving warehouse failed`}
    }
};

const deleteItem = async (name, warehouseName, itemName) => {
    try {
        await mongoose.connect(process.env.ATLAS_URL);
        const smallCompany = await SmallCompany.findOne({name});

        console.log(smallCompany);
        console.log(warehouseName);
        console.log(itemName);

        console.log(smallCompany.warehouses);
        const warehouses = smallCompany.warehouses;
        const filteredWarehouse= warehouses.filter(warehouse => warehouse.warehouseName === warehouseName);
        console.log(filteredWarehouse);
        const warehouse = filteredWarehouse[0];
        const items = warehouse.items;
        console.log(items);
        const filteredItems = items.filter(item => item.itemName === itemName);
        console.log(filteredItems);
        const item = filteredItems[0];

        console.log('Printing out filtered Items!');
        console.log(warehouse._id);
        console.log(item._id);
        smallCompany.warehouses.id(warehouse._id).items.id(item._id).remove();

        console.log(smallCompany);

        console.log('preparing to delete');
        await mongoose.connect(process.env.ATLAS_URL);
        await smallCompany.save();

        console.log('finished deleting');

        mongoose.connection.close();
        return;
    } catch (err) {
        mongoose.connection.close();
        throw err;
    }
};

const itemExists = async (name, warehouseName, itemName) => {
    try{
        await mongoose.connect(process.env.ATLAS_URL);
        
        const smallCompany = await SmallCompany.findOne({name});
        
        const warehouses = smallCompany.warehouses;
        const filteredWarehouse= warehouses.filter(warehouse => warehouse.warehouseName === warehouseName);
        const warehouse = filteredWarehouse[0];
        const items = warehouse.items;

        console.log(items);

        const isItemHere = items.filter(item => item.itemName === itemName);
        //const selectedItem = items.filter(item => item.itemName === oldItemName);
        
        console.log(isItemHere);
        //console.log(selectedItem);

        if(isItemHere === []){
            console.log('No item, can proceed');
        }
        else{
            console.log('Item already exists!');
            throw {status: 500, error: `Item already exists`};
        }
        return;
    } catch(err){
        mongoose.connection.close();
        return err;
    }
};

const updateItem= async (name, warehouseName, oldItemName, { itemName, price} ) => {
    try{
        await mongoose.connect(process.env.ATLAS_URL);
        
        const smallCompany = await SmallCompany.findOne({name});
        
        const warehouses = smallCompany.warehouses;
        const filteredWarehouse= warehouses.filter(warehouse => warehouse.warehouseName === warehouseName);
        const warehouse = filteredWarehouse[0];
        const items = warehouse.items;

        console.log(items);

        const isItemHere = items.filter(item => item.itemName === itemName);
        const selectedItem = items.filter(item => item.itemName === oldItemName);
        
        console.log(isItemHere);
        console.log(selectedItem);

        //setting new values
        smallCompany.warehouses.id(warehouse._id).items.id(selectedItem[0]._id).itemName = itemName;
        smallCompany.warehouses.id(warehouse._id).items.id(selectedItem[0]._id).price = price;
        
        await mongoose.connect(process.env.ATLAS_URL);
        await smallCompany.save();
        
        mongoose.connection.close();
        
        console.log("Inside updateItem. Returning now...");
        return {status: 200, message: `Item updated successfully!`};
    } catch(err){
        mongoose.connection.close();
        return err;
    }
};

module.exports = {
    addItem,
    deleteItem,
    updateItem,
    itemExists
}