const router = require('express').Router();
const { resolve } = require('path');
const { addItem, deleteItem } = require ('../controllers/itemController.js');

router.post('/:name', async (req, res) => {
    try{
        console.log("Printing Body: itemRoute\n");
        console.log(req.body);
        console.log(req.params.name);
        const data = await addItem(req.params.name , req.body);
        console.log(data);
        //res.status(200).json(data);
        res.status(200).json({message: 'itemRoute was successful!!'});
    } catch(err){
        res.status(500).json(err);
    }
});

router.delete('/:name', async (req,res) => {
    try {
        console.log(req.params.name);
        console.log(req.body);
        //console.log(req.params.warehouseName);
        await deleteItem(req.params.name, req.body);
        res.status(200).json({message: `Item successfully deleted!`});
    } catch (err) {
        res.status(500).json({error: 'Unable to delete company'});
    }
});

module.exports = router;