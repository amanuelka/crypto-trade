const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const cryptoSchema = new Schema({
    name: { type: String, required: true, minlength: [2, 'The name must be at least 2 characters long'] },
    imageUrl: { type: String, required: true, match: [URL_PATTERN, 'Invalid image URL'] },
    price: { type: Number, required: true, min: [0, 'Price must be a positive number'] },
    description: { type: String, required: true, minlength: [10, 'The description must be at least 10 characters long'] },
    payment: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User' },
    users: { type: [Types.ObjectId], ref: 'User', default: [] }
});


const Crypto = model('Crypto', cryptoSchema);
module.exports = Crypto;