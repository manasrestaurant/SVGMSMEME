const Meme = require('../Models/Meme');
const User = require('../Models/User');

// --- NEW: Create Meme with File Upload ---
exports.createMeme = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a meme image." });
    }

    const { caption, category, isAnonymous } = req.body;

    // FIX: Change 'image' to 'imageUrl' to match your Mongoose Schema
    const newMeme = new Meme({
      caption,
      category,
      imageUrl: req.file.path, // Use the exact field name from your error: 'imageUrl'
      isAnonymous: isAnonymous === 'true',
      author: {
        userId: req.user.id,
        name: req.user.name
      }
    });

    await newMeme.save();

    // Update Sohail Ansari's Karma at GITS
    await User.findByIdAndUpdate(req.user.id, { $inc: { karma: 5 } });

    res.status(201).json(newMeme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to post meme." });
  }
};

// --- Existing: Fetch all memes ---
exports.getMemes = async (req, res) => {
  try {
    const { category, page, limit } = req.query;
    const query = category ? { category } : {};
    
    const memes = await Meme.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    res.json(memes);
  } catch (err) {
    res.status(500).json({ error: "Feed failed to load." });
  }
};

// --- Existing: Upvote logic ---
exports.upvoteMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).json({ error: "Meme not found." });

    const userId = req.user.id;
    const authorId = meme.author.userId;

    const isRemoving = meme.upvotes.includes(userId);
    const karmaChange = isRemoving ? -10 : 10;

    if (isRemoving) {
      meme.upvotes = meme.upvotes.filter(id => id.toString() !== userId);
    } else {
      meme.upvotes.push(userId);
      meme.downvotes = meme.downvotes.filter(id => id.toString() !== userId);
    }

    await meme.save();

    if (authorId) {
      await User.findByIdAndUpdate(authorId, { $inc: { karma: karmaChange } });
    }

    res.json({ upvotes: meme.upvotes.length });
  } catch (err) {
    res.status(400).json({ error: "Vote failed." });
  }
};