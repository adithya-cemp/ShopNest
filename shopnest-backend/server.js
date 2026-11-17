require('dotenv').config();
require('dns').setServers(['8.8.8.8']);
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173', ...(process.env.CLIENT_URLS || '').split(',')].map(x => x.trim()).filter(Boolean);
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin)) return callback(null, true); return callback(new Error(`CORS blocked origin: ${origin}`)); }, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }));
app.get('/', (req, res) => res.json({ success: true, message: 'ShopNest API is running.', endpoints: ['/api/products', '/api/auth/register', '/api/auth/login', '/api/orders'] }));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (require.main === module) connectDB().then(() => app.listen(PORT, () => console.log(`ShopNest API listening on port ${PORT}`))).catch(err => { console.error('Startup failed:', err.message); process.exit(1); });
module.exports = app;
