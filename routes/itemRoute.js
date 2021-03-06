const router = require('express').Router();
const { resolve } = require('path');
const { addItem, deleteItem, updateItem } = require ('../controllers/itemController.js');

router.post('/:name&:warehouseName', async (req, res) => {
    try{
        console.log("Printing Body: itemRoute\n");
        console.log(req.body);
        console.log(req.params.name);
        await addItem(req.params.name, req.params.warehouseName, req.body);
        res.redirect(`/warehouse/${req.params.name}`);
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/update/:name&:warehouseName&:itemName', async (req, res) => {
    try{
        console.log("itemRoute: inside updateRoute");
        console.log(req.body);
        console.log(req.params.name);
        await updateItem(req.params.name, req.params.warehouseName, req.params.itemName, req.body);
        res.redirect(`/warehouse/${req.params.name}`);
        //res.status(200).json({message: `Got inside update item!`});
    } catch(err){
        res.status(500).json(err);
    }
});

router.delete('/:name&:warehouseName&:itemName', async (req,res) => {
    try {
        console.log(req.params.name);
        await deleteItem(req.params.name, req.params.warehouseName, req.params.itemName);
        res.status(200).json({message: `Item successfully deleted!`});
    } catch (err) {
        res.status(500).json({error: 'Unable to delete item'});
    }
});

module.exports = router;