const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, nama_pengguna, email, nomor_telepon, password } = req.body;
    try {
        // Check if the username or email already exists
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({ username, nama_pengguna, email, nomor_telepon, password: hashedPassword });

        // Save the user
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error); // Log the error
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Generate token
        const token = generateToken(user);

        // Return token if login successful
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during user login:', error); // Log the error
        res.status(500).json({ error: 'Failed to login' });
    }
};

// Get all users
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error during fetching users:', error); // Log the error
        res.status(500).json({ error: 'Failed to get users' });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error during fetching user by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to get user' });
    }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
    const { username, nama_pengguna, email, nomor_telepon } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, nama_pengguna, email, nomor_telepon },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error during updating user by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error during deleting user by ID:', error); // Log the error
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
