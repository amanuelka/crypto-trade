const Crypto = require('../models/Crypto');

async function getAll(searchName, searchMethod) {
    if (!searchName && !searchMethod) {
        return Crypto.find({}).lean();
    } else if (!searchName && searchMethod) {
        return (Crypto.find({ payment: searchMethod }).lean());
    } else if (searchName) {
        return (Crypto.find({ name: { $regex: searchName, $options: 'i' } }).lean());
    }
};

async function getById(id) {
    return Crypto.findById(id).lean();
};

async function create(data) {
    return Crypto.create(data);
};

async function update(id, data) {
    const existing = await Crypto.findById(id);
    Object.assign(existing, data);
    await existing.save();
};

async function deleteByid(id) {
    return Crypto.findByIdAndDelete(id);
};

async function buy(cryptoId, userId) {
    const crypto = await Crypto.findById(cryptoId);
    crypto.users.push(userId);
    await crypto.save();
};

module.exports = { getAll, getById, create, update, deleteByid, buy };