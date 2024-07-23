const express = require('express');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getAllOrders);
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id', authMiddleware, updateOrderById);
router.delete('/:id', authMiddleware, deleteOrderById);

module.exports = router;
