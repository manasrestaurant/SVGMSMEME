const express = require('express');
const router = express.Router();
const { register, login, getLeaderboard,findUserById,findNumberOfMemesByUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/users/register
router.post('/register', register);

// @route   POST /api/users/login
router.post('/login', login);
router.get('/leaderboard', getLeaderboard);
router.get('/:id',protect, findUserById);
router.get('/user-memes/:id', protect, findNumberOfMemesByUser);
// @route   GET /api/users/leaderboard


module.exports = router;