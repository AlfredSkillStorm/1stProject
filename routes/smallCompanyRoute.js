const router = require('express').Router();
const { resolve } = require('path');
const { addSmallCompany, deleteSmallCompany, getAllCompanies } = require ('../controllers/smallCompanyController.js');


router.get('/:name', async (req, res) => {
    try{
        console.log("Inside findWarehouse route");
        //const data = await findWarehouse('myWarehouse');
        const data = await findWarehouse(req.params.name);
        //console.log(data);
        res.status(200).json(data);
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try{
        const companies = await getAllCompanies();
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json(err);
    }
});

//for future use
router.post('/:name', async (req, res) => {
    try{
        //console.log("Inside post route");
        //const data = await findWarehouse('myWarehouse');
        //const data = await findWarehouse(req.params.name);
        console.log("Printing Body \n");
        console.log(req.body);
        //console.log(data);
        //res.status(200).json(data);
        res.status(200).json({message: `${req.params.name} successfully saved!`});
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await addSmallCompany(req.body);
        //const data = await addWarehouse(req.body);
        console.log(data);
        res.sendFile(resolve('public', 'views', 'index.html')); // ./public/views/index.html
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:name', async (req,res) => {
    try {
        await deleteSmallCompany(req.params.name);
        res.status(200).json({message: `${req.params.name} successfully deleted!`});
    } catch (err) {
        res.status(500).json({error: 'Unable to delete company'});
    }
});

module.exports = router;