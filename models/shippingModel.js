const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    metode_pengiriman: { type: String, required: true },
    alamat_pengiriman: { type: String, required: true },
    tanggal_pengiriman: { type: Date, required: true }
});

module.exports = mongoose.model('Shipping', shippingSchema);
