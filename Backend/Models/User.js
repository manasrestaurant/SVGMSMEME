const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email']
  },
  password: { type: String, required: true, select: false },
  profileImage: { type: String, default: 'default_panda.png' },
  
  // The "Social" Stats
  karma: { type: Number, default: 0 }, // Total upvotes received on their memes
  rank: { 
    type: String, 
    enum: ['Meme King', 'Chaos Machine', 'Silent Sniper', 'Freshman'], 
    default: 'Freshman' 
  },
  
  // Tracking user history
  savedMemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }],
  myMemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }],

  createdAt: { type: Date, default: Date.now }
});

// Encrypt password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);