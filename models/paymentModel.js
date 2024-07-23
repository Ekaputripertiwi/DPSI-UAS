const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    metode_pembayaran: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
