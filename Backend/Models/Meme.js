const mongoose = require('mongoose');

const MemeSchema = new mongoose.Schema({
  caption: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['ExamSeason', 'Attendance', 'Canteen', 'HostelLife', 'Freshers', 'Seniors', 'SportsDay', 'CampusDrama'],
    required: true 
  },
  author: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    anonymousName: { type: String, default: "Anonymous Panda" },
    isAnonymous: { type: Boolean, default: true }
  },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meme', MemeSchema);