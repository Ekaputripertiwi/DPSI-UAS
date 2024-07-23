const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware autentikasi
const router = express.Router();

// Terapkan middleware autentikasi pada semua rute CRUD
router.post('/', authMiddleware, createProduct);
router.get('/', authMiddleware, getAllProducts);
router.get('/:id', authMiddleware, getProductById);
router.put('/:id', authMiddleware, updateProductById);
router.delete('/:id', authMiddleware, deleteProductById);

module.exports = router;
