const express = require('express');
const {
    createShipping,
    getAllShippings,
    getShippingById,
    updateShippingById,
    deleteShippingById
} = require('../controllers/shippingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createShipping);
router.get('/', authMiddleware, getAllShippings);
router.get('/:id', authMiddleware, getShippingById);
router.put('/:id', authMiddleware, updateShippingById);
router.delete('/:id', authMiddleware, deleteShippingById);

module.exports = router;
