const express = require('express');
const {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddressById,
    deleteAddressById
} = require('../controllers/addressController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createAddress);
router.get('/', authMiddleware, getAllAddresses);
router.get('/:id', authMiddleware, getAddressById);
router.put('/:id', authMiddleware, updateAddressById);
router.delete('/:id', authMiddleware, deleteAddressById);

module.exports = router;
