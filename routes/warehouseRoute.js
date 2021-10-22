const router = require('express').Router();
const { resolve } = require('path');
const { addWarehouse, deleteWarehouse } = require ('../controllers/warehouseController.js');


router.get('/:name', async (req, res) => {
    try{
        //console.log("Printing Body \n");
        //console.log(req.body);
        //const data = await addWarehouse(req.params.name ,req.body);
        //console.log(data);
        //res.status(200).json(data);
        //res.status(200).json({message: 'warehouseRoute was successful!!'});
        res.sendFile(resolve('public', 'views', 'companyView.html')); // ./public/views/index.html
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/:name', async (req, res) => {
    try{
        //console.log("Inside post route");
        //const data = await findWarehouse('myWarehouse');
        //const data = await findWarehouse(req.params.name);
        console.log("Printing Body \n");
        console.log(req.body);
        const data = await addWarehouse(req.params.name ,req.body);
        //console.log(data);
        //res.status(200).json(data);
        res.status(200).json({message: 'warehouseRoute was successful!!'});
        //res.sendFile(resolve('public', 'views', 'index.html')); // ./public/views/index.html
    } catch(err){
        res.status(500).json(err);
    }
});

router.delete('/:name&:warehouseName', async (req,res) => {
    try {
        console.log(req.params.name);
        console.log(req.params.warehouseName);
        await deleteWarehouse(req.params.name, req.params.warehouseName);
        res.status(200).json({message: `${req.params.warehouseName} successfully deleted!`});
    } catch (err) {
        res.status(500).json({error: 'Unable to delete company'});
    }
});

module.exports = router;