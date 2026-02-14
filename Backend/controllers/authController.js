const User = require('../Models/User');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new student
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: 'System crash during registration!' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
        rank: user.rank,
        karma: user.karma
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// @desc    Get top 10 users by Karma for the Leaderboard
// @route   GET /api/auth/leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    // We use .find() to get users, .select() to keep it secure (no passwords!),
    // and .sort() to put the "Meme Kings" at the top.
    const leaderboard = await User.find({})
      .select('name rank karma profileImage') 
      .sort({ karma: -1 }) 
      .limit(10); 

    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "The Hall of Fame is currently chaotic. Try again!" });
  }
};

exports.findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
} catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

exports.findNumberOfMemesByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('myMemes');
    if (user) {
      res.json({ memeCount: user.myMemes.length });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching meme count' });
  }
};