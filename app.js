const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const addressRoutes = require('./routes/addressRoutes');
const indexRoutes = require ('./routes/index');
dotenv.config();
connectDB();
// Connect to database
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/',indexRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shippings', shippingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/address', addressRoutes);     

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;