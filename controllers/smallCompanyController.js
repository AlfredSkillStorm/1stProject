const mongoose = require('mongoose');
const SmallCompany = require('../models/SmallCompany.js');

const addSmallCompany = async ({name}) => {
    try{
        await mongoose.connect(process.env.ATLAS_URL);
        const smallCompany = new SmallCompany({name});
        await smallCompany.save();
        mongoose.connection.close();

        console.log("Added Small Company");
        return {status: 200, message: `${name} successfully saved!`};
    } catch(err){
        mongoose.connection.close();
        throw {status: 500, error: `Saving company failed`}
    }
};

const findWarehouse = async (name) => {
    try{
        console.log("inside findWarehouse function")
        await mongoose.connect(process.env.ATLAS_URL);
        const warehouse = await Warehouse.findOne({name});

        console.log('Printing data - premodified: \n\n');
        console.log(warehouse);

        let arr = [{name: 'apple', price: 2.99}];
        const orange = {name: 'orange', price: 0.99};

        await Warehouse.findOneAndUpdate({name},{items: 
            arr
        });

        console.log('Printing data - post modified part 1: \n\n');
        console.log(warehouse);

        arr.push(orange);
        console.log(arr);

        await Warehouse.findOneAndUpdate({name},{items: 
            arr
        });

        console.log('Printing data - post modified part 2: \n\n');
        console.log(warehouse);

        for(item of warehouse.items){
            console.log(item.name);
        }

        mongoose.connection.close();
        
        return warehouse;
    } catch(err){
        mongoose.connection.close();
        throw {status: 500, error: `Retrieving warehouse failed`}
    }
};

//NEEDS TO BE UPDATED
const updateSmallCompany = async ({name,maxLoad}) => {
    try{
        await mongoose.connect(process.env.ATLAS_URL);
        //const warehouse = new Warehouse({name, maxLoad});
        //await warehouse.save();
        mongoose.connection.close();
        console.log("Inside Warehouse, now printing data");
        console.log(name);
        console.log(maxLoad);
        console.log("Added Warehouse");
        return {status: 200, message: `${name} successfully saved!`};
    } catch(err){
        mongoose.connection.close();
        throw {status: 500, error: `Saving warehouse failed`}
    }
};

const deleteSmallCompany = async (name) => {
    try {
        await mongoose.connect(process.env.ATLAS_URL);
        await SmallCompany.deleteOne({name});
        mongoose.connection.close();
        console.log("Deleted Small Company");
        return;
    } catch (err) {
        mongoose.connection.close();
        throw err;
    }
};

const getAllCompanies = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URL);
        const smallCompanies = await SmallCompany.find();
        console.log(smallCompanies);
        if (smallCompanies.length === 0)
            throw {status: 500,  error: 'No companies available'}
        mongoose.connection.close();
        return smallCompanies;
    }catch (err) {
        mongoose.connection.close();
        throw err;
    }
}

module.exports = {
    addSmallCompany,
    deleteSmallCompany,
    getAllCompanies
}