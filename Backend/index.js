const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./db/db');
const morgan = require('morgan');
const path = require('path');
const app = express();
// 1. Security Headers & CORS
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

// 2. Body Parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '80mb' }));
// THE FIX: Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// ... your routes
// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: "Too much chaos! Try again later."
});
app.use('/api/', limiter);
app.use(morgan('dev'));
connectDB();

// 4. Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/memes', require('./routes/memeRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));