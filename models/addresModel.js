const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    alamat_lengkap: { type: String, required: true },
    kode_pos: { type: String, required: true }
});

module.exports = mongoose.model('Address', addressSchema);
