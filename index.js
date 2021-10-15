const express = require('express');
const { resolve } = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8088;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/smallCompany', require('./routes/smallCompanyRoute.js'));
app.use('/warehouse', require('./routes/warehouseRoute.js'));
app.use('/item', require('./routes/itemRoute.js'));

app.get('/', (req,res) => {
    res.sendFile(resolve('public', 'views', 'index.html'))
});

app.get('*', (req,res) => {
    //res.sendFile(resolve('public', 'views', 'index.html'))
    res.status(404).json({error: 'No Page Found'});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});