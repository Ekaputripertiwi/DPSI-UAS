const Address = require('../models/addresModel');

// Create a new address
exports.createAddress = async (req, res) => {
    try {
        const { alamat_lengkap, kode_pos } = req.body;
        const newAddress = new Address({ user: req.user.id, alamat_lengkap, kode_pos });
        await newAddress.save();
        res.status(201).json(newAddress);
    } catch (err) {
        console.error('Error creating address:', err); // Log the error
        res.status(400).json({ error: err.message });
    }
};

// Get all addresses
exports.getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.find().populate('user', 'username email');
        res.status(200).json(addresses);
    } catch (err) {
        console.error('Error fetching addresses:', err); // Log the error
        res.status(400).json({ error: err.message });
    }
};

// Get a single address by ID
exports.getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id).populate('user', 'username email');
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (err) {
        console.error('Error fetching address by ID:', err); // Log the error
        res.status(400).json({ error: err.message });
    }
};

// Update an address by ID
exports.updateAddressById = async (req, res) => {
    try {
        const { alamat_lengkap, kode_pos } = req.body;
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { alamat_lengkap, kode_pos },
            { new: true }
        );
        if (!updatedAddress) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json(updatedAddress);
    } catch (err) {
        console.error('Error updating address by ID:', err); // Log the error
        res.status(400).json({ error: err.message });
    }
};

// Delete an address by ID
exports.deleteAddressById = async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);
        if (!deletedAddress) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (err) {
        console.error('Error deleting address by ID:', err); // Log the error
        res.status(400).json({ error: err.message });
    }
};
