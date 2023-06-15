const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  testScores: [
    {
      testId: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('User', usersSchema);
