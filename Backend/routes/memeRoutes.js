const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createMeme, getMemes, upvoteMeme } = require('../controllers/memeController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have auth

// Configure local storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Routes
router.get('/', getMemes);
router.post('/', protect, upload.single('image'), createMeme); // 'image' must match frontend key
router.patch('/:id/upvote', protect, upvoteMeme);

module.exports = router;