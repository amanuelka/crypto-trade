const { hasUser, isOwner } = require('../middlewares/guards');
const { parseError } = require('../middlewares/parsers');
const preload = require('../middlewares/preloader');
const { create, update, deleteByid, buy } = require('../services/cryptoService');

const cryptoController = require('express').Router();

cryptoController.get('/create', (req, res) => {
    res.render('create');
});

cryptoController.post('/create', async (req, res) => {
    const data = { ...req.body, owner: req.user._id };
    try {
        if (Object.values(data).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await create(data);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', { errors: parseError(error), ...data });
    }
});

cryptoController.get('/:id', preload(), async (req, res) => {
    const crypto = res.locals.crypto;
    if (req.user) {
        crypto.isOwner = req.user._id == crypto.owner._id;
        crypto.hasBought = crypto.users.some(u => u._id == req.user._id);
    }
    res.render('details', { ...crypto });
});

cryptoController.get('/:id/edit', hasUser(), preload(), isOwner(), (req, res) => {
    const crypto = res.locals.crypto;
    res.render('edit', { ...crypto });
});

cryptoController.post('/:id/edit', hasUser(), preload(), isOwner(), async (req, res) => {
    try {
        await update(req.params.id, { ...req.body, _id: req.params.id });
        res.redirect(`/crypto/${req.params.id}`);
    } catch (error) {
        res.render('edit', { errors: parseError(error), ...req.body });
    }
});

cryptoController.get('/:id/delete', hasUser(), preload(), isOwner(), async (req, res) => {
    await deleteByid(req.params.id);
    res.redirect('/catalog');
});

cryptoController.get('/:id/buy', hasUser(), async (req, res) => {
    await buy(req.params.id, req.user._id);
    res.redirect(`/crypto/${req.params.id}`);
});


module.exports = cryptoController;