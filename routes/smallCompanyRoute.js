const router = require('express').Router();
const { resolve } = require('path');
const { addSmallCompany, deleteSmallCompany, getAllCompanies } = require ('../controllers/smallCompanyController.js');


router.get('/add', async (req, res) => {
    try{
        res.sendFile(resolve('public', 'views', 'addCompany.html'));
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:name', async (req, res) => {
    try{
        console.log("Inside findWarehouse route");
        const data = await findWarehouse(req.params.name);
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

router.post('/addCompany', async (req, res) => {
    try {
        const data = await addSmallCompany(req.body);
        console.log(data);
        res.sendFile(resolve('public', 'views', 'index.html'));
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/add', async (req, res) => {
    try {
        const data = await addSmallCompany(req.body);
        console.log(data);
        res.redirect('/');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:name', async (req,res) => {
    try {
        await deleteSmallCompany(req.params.name);
        res.sendFile(resolve('public', 'views', 'index.html')); 
    } catch (err) {
        res.status(500).json({error: 'Unable to delete company'});
    }
});

module.exports = router;