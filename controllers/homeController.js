const { getAll } = require('../services/cryptoService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/catalog', async (req, res) => {
    const offers = await getAll();
    res.render('catalog', { offers });
});

homeController.get('/search', async (req, res) => {
    let offers = await getAll(req.query.name, req.query.payment);
    res.render('search', { offers, name: req.query.name });
});

module.exports = homeController;