const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total: { type: Number, required: true },
    tgl_pemesanan: { type: Date, default: Date.now },
    tgl_pengiriman: { type: Date, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
