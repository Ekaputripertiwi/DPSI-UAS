const express = require('express');
const { 
    registerUser,
    loginUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById 
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware autentikasi
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Terapkan middleware autentikasi pada rute yang memerlukan autentikasi
router.get('/', authMiddleware, getAllUser);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUserById);
router.delete('/:id', authMiddleware, deleteUserById);

module.exports = router;
