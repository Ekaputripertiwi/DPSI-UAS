const express = require('express');
const {
    processPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById
} = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, processPayment);
router.get('/', authMiddleware, getAllPayments);
router.get('/:id', authMiddleware, getPaymentById);
router.put('/:id', authMiddleware, updatePaymentById);
router.delete('/:id', authMiddleware, deletePaymentById);

module.exports = router;
