const { getById } = require('../services/cryptoService');

function preload() {
    return async function (req, res, next) {
        res.locals.crypto  = await getById(req.params.id);
        next();
    };
}

module.exports = preload;