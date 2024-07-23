const Order = require('../models/orderModel');

// Create a new order
exports.createOrder = async (req, res) => {
    const { total, tgl_pengiriman } = req.body;
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        
        const order = new Order({
            user: req.user.id, // Mengambil ID pengguna dari req.user
            total,
            tgl_pemesanan: new Date(), // Set the current date for tgl_pemesanan
            tgl_pengiriman
        });
        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error); // Log the error
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'username email');
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error); // Log the error
        res.status(500).json({ error: 'Failed to get orders' });
    }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'username email');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to get order' });
    }
};

// Update an order by ID
exports.updateOrderById = async (req, res) => {
    const { total, tgl_pengiriman } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { total, tgl_pengiriman },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to update order' });
    }
};

// Delete an order by ID
exports.deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to delete order' });
    }
};
