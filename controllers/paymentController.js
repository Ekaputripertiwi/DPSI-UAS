const Payment = require('../models/paymentModel');

// Process a payment
exports.processPayment = async (req, res) => {
    const { orderId, metode_pembayaran } = req.body;
    try {
        const payment = new Payment({ order: orderId, metode_pembayaran });
        await payment.save();
        res.status(201).json({ message: 'Payment processed successfully', payment });
    } catch (error) {
        console.error('Error processing payment:', error); // Log the error
        res.status(500).json({ error: 'Failed to process payment' });
    }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error); // Log the error
        res.status(500).json({ error: 'Failed to get payments' });
    }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error fetching payment by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to get payment' });
    }
};

// Update a payment by ID
exports.updatePaymentById = async (req, res) => {
    const { orderId, metode_pembayaran } = req.body;
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id,
            { order: orderId, metode_pembayaran },
            { new: true }
        );
        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment updated successfully', payment: updatedPayment });
    } catch (error) {
        console.error('Error updating payment by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to update payment' });
    }
};

// Delete a payment by ID
exports.deletePaymentById = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to delete payment' });
    }
};
