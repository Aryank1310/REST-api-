const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
    unique: true,
  },
  questions: [
    {
      questionId: {
        type: String,
        required: true,
      },
      correctAnswers: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Test', testSchema);
