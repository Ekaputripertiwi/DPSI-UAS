const Shipping = require('../models/shippingModel');

// Create a new shipping record
exports.createShipping = async (req, res) => {
    const { metode_pengiriman, alamat_pengiriman, tanggal_pengiriman } = req.body;
    try {
        const shipping = new Shipping({ user: req.user.id, metode_pengiriman, alamat_pengiriman, tanggal_pengiriman });
        await shipping.save();
        res.status(201).json({ message: 'Shipping record created successfully', shipping });
    } catch (error) {
        console.error('Error creating shipping record:', error); // Log the error
        res.status(500).json({ error: 'Failed to create shipping record' });
    }
};

// Get all shipping records
exports.getAllShippings = async (req, res) => {
    try {
        const shippings = await Shipping.find().populate('user', 'username email');
        res.status(200).json(shippings);
    } catch (error) {
        console.error('Error fetching shipping records:', error); // Log the error
        res.status(500).json({ error: 'Failed to get shipping records' });
    }
};

// Get a shipping record by ID
exports.getShippingById = async (req, res) => {
    try {
        const shipping = await Shipping.findById(req.params.id).populate('user', 'username email');
        if (!shipping) {
            return res.status(404).json({ error: 'Shipping record not found' });
        }
        res.status(200).json(shipping);
    } catch (error) {
        console.error('Error fetching shipping record by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to get shipping record' });
    }
};

// Update a shipping record by ID
exports.updateShippingById = async (req, res) => {
    const { metode_pengiriman, alamat_pengiriman, tanggal_pengiriman } = req.body;
    try {
        const updatedShipping = await Shipping.findByIdAndUpdate(
            req.params.id,
            { metode_pengiriman, alamat_pengiriman, tanggal_pengiriman },
            { new: true }
        );
        if (!updatedShipping) {
            return res.status(404).json({ error: 'Shipping record not found' });
        }
        res.status(200).json({ message: 'Shipping record updated successfully', shipping: updatedShipping });
    } catch (error) {
        console.error('Error updating shipping record by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to update shipping record' });
    }
};

// Delete a shipping record by ID
exports.deleteShippingById = async (req, res) => {
    try {
        const deletedShipping = await Shipping.findByIdAndDelete(req.params.id);
        if (!deletedShipping) {
            return res.status(404).json({ error: 'Shipping record not found' });
        }
        res.status(200).json({ message: 'Shipping record deleted successfully' });
    } catch (error) {
        console.error('Error deleting shipping record by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to delete shipping record' });
    }
};
